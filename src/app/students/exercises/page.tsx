// src/app/students/exercises/page.tsx

export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MyExercisesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/students/sign-in");
  }

  const userExercises = await prisma.userExercise.findMany({
    where: { userId: session.user.id },
    include: {
      exercise: {
        include: {
          topic: {
            include: { area: true },
          },
        },
      },
      attempts: {
        orderBy: { attemptedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { unlockedAt: "desc" },
  });

  const successParam =
    typeof globalThis !== "undefined" ? null : null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        My exercises
      </h1>
      <p className="text-gray-500 mb-8">Your purchased exercises</p>

      {userExercises.length === 0 ? (
        <div className="border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-4">You have no exercises yet.</p>
          <Link
            href="/shop"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 no-underline"
          >
            Browse the shop →
          </Link>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {userExercises.map((ue, index) => {
            const lastAttempt = ue.attempts[0] ?? null;
            const isLast = index === userExercises.length - 1;

            return (
              <div
                key={ue.id}
                className={`flex items-center justify-between px-5 py-4 ${
                  !isLast ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-xs text-gray-400 mb-0.5">
                    {ue.exercise.topic.area.name} · {ue.exercise.topic.name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {ue.exercise.title}
                  </p>
                  {lastAttempt ? (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Last score: {lastAttempt.score}%
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-0.5">Not started</p>
                  )}
                </div>

                <Link
                  href={`/students/exercises/${ue.exercise.id}`}
                  className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-3 py-1.5 no-underline transition-colors shrink-0"
                >
                  {lastAttempt ? "Redo" : "Start"}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}