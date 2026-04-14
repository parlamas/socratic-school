// src/app/admin/topics/page.tsx

import { prisma } from "@/lib/prisma.server";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ areaId?: string }>;
}

export default async function AdminTopicsPage({ searchParams }: Props) {
  const { areaId } = await searchParams;

  const areas = await prisma.area.findMany({ orderBy: { sortOrder: "asc" } });

  const topics = await prisma.topic.findMany({
    where: areaId ? { areaId } : undefined,
    orderBy: { sortOrder: "asc" },
    include: {
      area: true,
      _count: { select: { exercises: true } },
    },
  });

  async function createTopic(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const areaId = formData.get("areaId") as string;
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    await prisma.topic.create({ data: { name, slug, description, areaId } });
    revalidatePath("/admin/topics");
    redirect("/admin/topics");
  }

  async function toggleTopic(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = await prisma.topic.findUnique({ where: { id } });
    if (!current) return;
    await prisma.topic.update({ where: { id }, data: { isActive: !current.isActive } });
    revalidatePath("/admin/topics");
    redirect("/admin/topics");
  }

  async function deleteTopic(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.topic.delete({ where: { id } });
    revalidatePath("/admin/topics");
    redirect("/admin/topics");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Topics</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-base font-medium text-gray-900 mb-4">New topic</h2>
        <form action={createTopic} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              name="areaId"
              required
              defaultValue={areaId ?? ""}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
              <option value="" disabled>Select area</option>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <input
              name="name"
              required
              placeholder="Topic name"
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
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className={`flex items-center justify-between px-5 py-4 ${
              index !== topics.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-xs text-gray-400 mb-0.5">{topic.area.name}</p>
              <p className="text-sm font-medium text-gray-900">{topic.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {topic.slug} · {topic._count.exercises} exercises
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  topic.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {topic.isActive ? "Active" : "Inactive"}
              </span>
              <form action={toggleTopic}>
                <input type="hidden" name="id" value={topic.id} />
                <button
                  type="submit"
                  className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {topic.isActive ? "Deactivate" : "Activate"}
                </button>
              </form>
              <Link
                href={`/admin/exercises?topicId=${topic.id}`}
                className="text-xs text-indigo-600 hover:text-indigo-800 no-underline border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors"
              >
                Exercises →
              </Link>
              <form action={deleteTopic} onSubmit={(e) => { if (!confirm(`Delete "${topic.name}"? This will also delete all its exercises.`)) e.preventDefault(); }}>
                <input type="hidden" name="id" value={topic.id} />
                <button
                  type="submit"
                  className="text-xs text-red-400 hover:text-red-600 border border-red-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {topics.length === 0 && (
          <p className="text-sm text-gray-400 px-5 py-4">No topics yet.</p>
        )}
      </div>
    </div>
  );
}