// src/app/api/access/english-ex-001/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import { NextResponse } from "next/server";

const EXERCISE_ID = "cmnyn65sk0001ky049bomjzqw";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ status: "guest" });
  }

  const access = await prisma.userExercise.findUnique({
    where: {
      userId_exerciseId: {
        userId: session.user.id,
        exerciseId: EXERCISE_ID,
      },
    },
  });

  if (access) {
    return NextResponse.json({ status: "purchased" });
  }

  return NextResponse.json({ status: "signed-in" });
}