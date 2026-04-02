// src/app/api/stripe/checkout/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const { type, id } = await req.json();

  if (!type || !id || !["exercise", "bundle"].includes(type)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let lineItems: { price_data: { currency: string; product_data: { name: string }; unit_amount: number }; quantity: number }[] = [];
  let metadata: Record<string, string> = {
    userId: session.user.id,
    type,
    id,
  };

  if (type === "exercise") {
    const exercise = await prisma.exercise.findUnique({
      where: { id, isActive: true },
    });

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    const alreadyOwned = await prisma.userExercise.findUnique({
      where: { userId_exerciseId: { userId: session.user.id, exerciseId: id } },
    });

    if (alreadyOwned) {
      return NextResponse.json({ error: "Already owned" }, { status: 400 });
    }

    lineItems = [
      {
        price_data: {
          currency: "eur",
          product_data: { name: exercise.title },
          unit_amount: Math.round(Number(exercise.price) * 100),
        },
        quantity: 1,
      },
    ];
  }

  if (type === "bundle") {
    const bundle = await prisma.bundle.findUnique({
      where: { id, isActive: true },
      include: { topic: true },
    });

    if (!bundle) {
      return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
    }

    lineItems = [
      {
        price_data: {
          currency: "eur",
          product_data: { name: bundle.title },
          unit_amount: Math.round(Number(bundle.price) * 100),
        },
        quantity: 1,
      },
    ];
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    metadata,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/students/exercises?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}