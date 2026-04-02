//src/app/shop/page.tsx

import { prisma } from "@/lib/prisma.server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const areas = await prisma.area.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: {
        select: { topics: true },
      },
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        Exercises shop
      </h1>
      <p className="text-gray-500 mb-8">
        Choose a subject area to browse topics and exercises
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {areas.map((area) => (
          <Link
            key={area.id}
            href={`/shop/${area.slug}`}
            className="block border border-gray-200 rounded-xl p-5 no-underline hover:border-indigo-300 hover:bg-indigo-50 transition-colors group"
          >
            <p className="text-base font-medium text-gray-900 group-hover:text-indigo-700 mb-1">
              {area.name}
            </p>
            {area.description && (
              <p className="text-sm text-gray-500 mb-3">{area.description}</p>
            )}
            <p className="text-xs text-gray-400">
              {area._count.topics} topic{area._count.topics !== 1 ? "s" : ""}
            </p>
          </Link>
        ))}

        {areas.length === 0 && (
          <p className="text-gray-400 text-sm col-span-full">
            No subjects available yet.
          </p>
        )}
      </div>
    </main>
  );
}