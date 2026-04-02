// src/app/api/exercises/attempt/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const { userExerciseId, exerciseId, answers, score } = await req.json();

  if (!userExerciseId || !exerciseId || !answers || score === undefined) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const userExercise = await prisma.userExercise.findUnique({
    where: { id: userExerciseId, userId: session.user.id },
  });

  if (!userExercise) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.exerciseAttempt.create({
    data: {
      userExerciseId,
      exerciseId,
      answers,
      score,
    },
  });

  return NextResponse.json({ ok: true });
}