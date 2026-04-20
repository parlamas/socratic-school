// src/app/students/exercises/[id]/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import { redirect, notFound } from "next/navigation";
import { canUserAccessExercise } from "@/lib/access";
import PracticeClient from "./PracticeClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PracticePage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/students/sign-in");
  }

  const hasAccess = await canUserAccessExercise(session.user.id, id);

  if (!hasAccess) {
    notFound();
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: {
      topic: { include: { area: true } },
    },
  });

  if (!exercise) notFound();

  const userExercise = await prisma.userExercise.findUnique({
    where: { userId_exerciseId: { userId: session.user.id, exerciseId: id } },
    include: {
      attempts: {
        orderBy: { attemptedAt: "desc" },
        take: 1,
      },
    },
  });

  if (exercise.route) {
    redirect(exercise.route);
  }

  return (
    <PracticeClient
      exercise={{
        id: exercise.id,
        title: exercise.title,
        type: exercise.type,
        content: exercise.content as Record<string, unknown>,
        topicName: exercise.topic.name,
        areaName: exercise.topic.area.name,
      }}
      userExerciseId={userExercise!.id}
      bestScore={userExercise?.attempts[0]?.score ?? null}
    />
  );
}