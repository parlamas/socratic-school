// src/app/students/exercises/[id]/page.tsx

import { prisma } from "@/lib/prisma.server";
import { notFound, redirect } from "next/navigation";
import PracticeClient from "./PracticeClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PracticePage({ params }: Props) {
  const { id } = await params;

  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: {
      topic: { include: { area: true } },
    },
  });

  if (!exercise) notFound();

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
      userExerciseId={null}
      bestScore={null}
    />
  );
}


