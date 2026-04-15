// src/app/students/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma.server";
import Link from "next/link";

export default async function StudentPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/students/sign-in");
  }

  const displayName = session.user?.firstName || session.user?.username || session.user?.email || "Student";

  const userExercises = await prisma.userExercise.findMany({
    where: { userId: session.user.id },
    select: { exerciseId: true },
  });

  const ownedIds = new Set(userExercises.map((ue) => ue.exerciseId));

  const allExercises = await prisma.exercise.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      topic: {
        include: { area: true },
      },
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome back, <span className="font-medium text-gray-800">{displayName}</span>.
          </p>
        </div>

        {/* All exercises */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-900">Exercises</h2>
          </div>
          {allExercises.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-gray-400">No exercises available yet.</p>
            </div>
          ) : (
            allExercises.map((exercise, index) => {
              const owned = ownedIds.has(exercise.id);
              return (
                <div
                  key={exercise.id}
                  className={`flex items-center justify-between px-5 py-4 ${
                    index !== allExercises.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-xs text-gray-400 mb-0.5">
                      {exercise.topic.area.name} → {exercise.topic.name}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {exercise.title}
                    </p>
                    {!owned && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        €{Number(exercise.price).toFixed(2)} · 3 free questions
                      </p>
                    )}
                  </div>
                  {owned ? (
                    <Link
                      href={`/students/exercises/${exercise.id}`}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 no-underline border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors shrink-0"
                    >
                      Practice
                    </Link>
                  ) : (
                    <Link
                      href={`${exercise.id === 'cmnyn65sk0001ky049bomjzqw' ? '/english/ex-001' : exercise.id === 'cmnyph3x70001ju04oqbj0zbz' ? '/english/ex-002' : exercise.id === 'cmnzt75kn0001k004ub64r2sv' ? '/Danish/ex-001' : '/english/ex-001'}`}
                      className="text-xs font-medium text-gray-600 hover:text-gray-800 no-underline border border-gray-200 rounded-lg px-3 py-1.5 transition-colors shrink-0"
                    >
                      Try
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Shop link */}
        <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Looking for more?</p>
            <p className="text-xs text-gray-400 mt-0.5">Browse all available exercises in the shop.</p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 no-underline transition-colors shrink-0"
          >
            Shop →
          </Link>
        </div>

      </div>
    </main>
  );
}