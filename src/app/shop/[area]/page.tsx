//src/app/shop/[area]/page.tsx

import { prisma } from "@/lib/prisma.server";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ area: string }>;
}

export default async function AreaPage({ params }: Props) {
  const { area: areaSlug } = await params;

  const area = await prisma.area.findUnique({
    where: { slug: areaSlug, isActive: true },
    include: {
      topics: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: {
          _count: {
            select: { exercises: true },
          },
        },
      },
    },
  });

  if (!area) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6">
        <Link
          href="/shop"
          className="text-sm text-gray-400 hover:text-gray-600 no-underline"
        >
          ← Shop
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        {area.name}
      </h1>
      {area.description && (
        <p className="text-gray-500 mb-8">{area.description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {area.topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/shop/${areaSlug}/${topic.slug}`}
            className="block border border-gray-200 rounded-xl p-5 no-underline hover:border-indigo-300 hover:bg-indigo-50 transition-colors group"
          >
            <p className="text-base font-medium text-gray-900 group-hover:text-indigo-700 mb-1">
              {topic.name}
            </p>
            {topic.description && (
              <p className="text-sm text-gray-500 mb-3">{topic.description}</p>
            )}
            <p className="text-xs text-gray-400">
              {topic._count.exercises} exercise{topic._count.exercises !== 1 ? "s" : ""}
            </p>
          </Link>
        ))}

        {area.topics.length === 0 && (
          <p className="text-gray-400 text-sm col-span-full">
            No topics available yet.
          </p>
        )}
      </div>
    </main>
  );
}