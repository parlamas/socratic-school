//src/appshp/[area]/[topic]/page.tsx

import { prisma } from "@/lib/prisma.server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BuyButton from "@/app/shop/BuyButton";

interface Props {
  params: Promise<{ area: string; topic: string }>;
}

export default async function TopicPage({ params }: Props) {
  const { area: areaSlug, topic: topicSlug } = await params;
  const session = await getServerSession(authOptions);

  const topic = await prisma.topic.findFirst({
    where: {
      slug: topicSlug,
      isActive: true,
      area: { slug: areaSlug, isActive: true },
    },
    include: {
      area: true,
      exercises: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
      bundles: {
        where: { isActive: true },
        include: {
          bundleExercises: true,
        },
      },
    },
  });

  if (!topic) notFound();

  const userExercises = session?.user?.id
    ? await prisma.userExercise.findMany({
        where: { userId: session.user.id },
        select: { exerciseId: true },
      })
    : [];

  const ownedIds = new Set(userExercises.map((ue) => ue.exerciseId));

  const bundle = topic.bundles[0] ?? null;
  const allOwned =
    bundle !== null &&
    topic.exercises.every((ex) => ownedIds.has(ex.id));

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/shop" className="hover:text-gray-600 no-underline">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop/${areaSlug}`}
          className="hover:text-gray-600 no-underline"
        >
          {topic.area.name}
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        {topic.name}
      </h1>
      {topic.description && (
        <p className="text-gray-500 mb-8">{topic.description}</p>
      )}

      <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
        {topic.exercises.map((exercise, index) => {
          const owned = ownedIds.has(exercise.id);
          return (
            <div
              key={exercise.id}
              className={`flex items-center justify-between px-5 py-4 ${
                index !== topic.exercises.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {exercise.title}
                </p>
                {exercise.description && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {exercise.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {owned ? (
                  <Link
                    href={`/students/exercises/${exercise.id}`}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 no-underline border border-indigo-200 hover:border-indigo-400 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    Practice
                  </Link>
                ) : (
                  <BuyButton
                    type="exercise"
                    id={exercise.id}
                    label={`€${Number(exercise.price).toFixed(2)}`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {bundle && !allOwned && (
        <div className="border border-indigo-200 bg-indigo-50 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-900">
              {bundle.title}
            </p>
            <p className="text-xs text-indigo-600 mt-0.5">
              All {topic.exercises.length} exercises · save vs buying separately
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-lg font-semibold text-indigo-900">
              €{Number(bundle.price).toFixed(2)}
            </span>
            <BuyButton
              type="bundle"
              id={bundle.id}
              label="Buy bundle"
            />
          </div>
        </div>
      )}

      {topic.exercises.length === 0 && (
        <p className="text-gray-400 text-sm">No exercises available yet.</p>
      )}
    </main>
  );
}