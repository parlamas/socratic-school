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
    include: {
      exercise: {
        include: {
          topic: {
            include: { area: true },
          },
        },
      },
    },
    orderBy: { unlockedAt: "desc" },
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

        {/* Purchased exercises */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-medium text-gray-900">My exercises</h2>
          </div>
          {userExercises.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-gray-400 mb-4">You haven't purchased any exercises yet.</p>
              <Link
                href="/shop"
                className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 no-underline transition-colors"
              >
                Browse shop
              </Link>
            </div>
          ) : (
            userExercises.map((ue, index) => (
              <div
                key={ue.id}
                className={`flex items-center justify-between px-5 py-4 ${
                  index !== userExercises.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-xs text-gray-400 mb-0.5">
                    {ue.exercise.topic.area.name} → {ue.exercise.topic.name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {ue.exercise.title}
                  </p>
                </div>
                <Link
                  href={`/students/exercises/${ue.exerciseId}`}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800 no-underline border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors shrink-0"
                >
                  Practice
                </Link>
              </div>
            ))
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