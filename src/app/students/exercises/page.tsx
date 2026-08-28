// src/app/students/exercises/page.tsx

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma.server";
import Link from "next/link";

export default async function AllExercisesPage() {
  const exercises = await prisma.exercise.findMany({
    include: {
      topic: {
        include: { area: true },
      },
    },
    orderBy: [
      { topic: { area: { name: "asc" } } },
      { topic: { name: "asc" } },
    ],
  });

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        Exercises
      </h1>
      <p className="text-gray-500 mb-8">Free to try, no sign-up required</p>

      {exercises.length === 0 ? (
        <div className="border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-400">No exercises available yet.</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {exercises.map((exercise, index) => {
            const isLast = index === exercises.length - 1;

            return (
              <div
                key={exercise.id}
                className={`flex items-center justify-between px-5 py-4 ${
                  !isLast ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-xs text-gray-400 mb-0.5">
                    {exercise.topic.area.name} · {exercise.topic.name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {exercise.title}
                  </p>
                </div>

                <Link
                  href={`/students/exercises/${exercise.id}`}
                  className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-3 py-1.5 no-underline transition-colors shrink-0"
                >
                  Start
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

