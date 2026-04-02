//src/lib/access.ts

import "server-only";
import { prisma } from "@/lib/prisma.server";

export async function canUserAccessExercise(
  userId: string,
  exerciseId: string
): Promise<boolean> {
  const record = await prisma.userExercise.findUnique({
    where: {
      userId_exerciseId: { userId, exerciseId },
    },
  });
  return record !== null;
}