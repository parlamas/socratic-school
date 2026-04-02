// src/app/admin/areas/page.tsx

import { prisma } from "@/lib/prisma.server";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AdminAreasPage() {
  const areas = await prisma.area.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { topics: true } } },
  });

  async function createArea(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    await prisma.area.create({ data: { name, slug, description } });
    revalidatePath("/admin/areas");
    redirect("/admin/areas");
  }

  async function toggleArea(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = await prisma.area.findUnique({ where: { id } });
    if (!current) return;
    await prisma.area.update({ where: { id }, data: { isActive: !current.isActive } });
    revalidatePath("/admin/areas");
    redirect("/admin/areas");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Areas</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-base font-medium text-gray-900 mb-4">New area</h2>
        <form action={createArea} className="flex flex-col sm:flex-row gap-3">
          <input
            name="name"
            required
            placeholder="Area name"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <input
            name="description"
            placeholder="Description (optional)"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <button
            type="submit"
            className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 transition-colors shrink-0"
          >
            Create
          </button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {areas.map((area, index) => (
          <div
            key={area.id}
            className={`flex items-center justify-between px-5 py-4 ${
              index !== areas.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{area.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {area.slug} · {area._count.topics} topics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  area.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {area.isActive ? "Active" : "Inactive"}
              </span>
              <form action={toggleArea}>
                <input type="hidden" name="id" value={area.id} />
                <button
                  type="submit"
                  className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {area.isActive ? "Deactivate" : "Activate"}
                </button>
              </form>
              <Link
                href={`/admin/topics?areaId=${area.id}`}
                className="text-xs text-indigo-600 hover:text-indigo-800 no-underline border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors"
              >
                Topics →
              </Link>
            </div>
          </div>
        ))}
        {areas.length === 0 && (
          <p className="text-sm text-gray-400 px-5 py-4">No areas yet.</p>
        )}
      </div>
    </div>
  );
}