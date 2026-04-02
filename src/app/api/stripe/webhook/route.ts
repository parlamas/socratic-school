// src/app/api/stripe/webhook/route.ts

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma.server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, type, id } = session.metadata as {
      userId: string;
      type: string;
      id: string;
    };

    const order = await prisma.order.create({
      data: {
        userId,
        stripeSessionId: session.id,
        stripePaymentIntent: session.payment_intent as string,
        status: "paid",
        total: session.amount_total ? session.amount_total / 100 : 0,
        items: {
          create: {
            itemType: type === "bundle" ? "bundle" : "exercise",
            exerciseId: type === "exercise" ? id : null,
            bundleId: type === "bundle" ? id : null,
            pricePaid: session.amount_total ? session.amount_total / 100 : 0,
          },
        },
      },
    });

    if (type === "exercise") {
      await prisma.userExercise.upsert({
        where: { userId_exerciseId: { userId, exerciseId: id } },
        create: { userId, exerciseId: id, orderId: order.id },
        update: {},
      });
    }

    if (type === "bundle") {
      const bundle = await prisma.bundle.findUnique({
        where: { id },
        include: { bundleExercises: true },
      });

      if (bundle) {
        for (const be of bundle.bundleExercises) {
          await prisma.userExercise.upsert({
            where: {
              userId_exerciseId: { userId, exerciseId: be.exerciseId },
            },
            create: { userId, exerciseId: be.exerciseId, orderId: order.id },
            update: {},
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}