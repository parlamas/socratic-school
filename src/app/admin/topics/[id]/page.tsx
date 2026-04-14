// src/app/admin/topics/[id]/page.tsx

import { prisma } from "@/lib/prisma.server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTopicPage({ params }: Props) {
  const { id } = await params;

  const topic = await prisma.topic.findUnique({
    where: { id },
    include: { area: true },
  });

  if (!topic) notFound();

  const areas = await prisma.area.findMany({ orderBy: { sortOrder: "asc" } });

  async function updateTopic(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const areaId = formData.get("areaId") as string;
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    await prisma.topic.update({
      where: { id },
      data: { name, slug, description, areaId },
    });
    revalidatePath("/admin/topics");
    redirect("/admin/topics");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Edit topic</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form action={updateTopic} className="flex flex-col gap-3">
          <select
            name="areaId"
            required
            defaultValue={topic.areaId}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          >
            {areas.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <input
            name="name"
            required
            defaultValue={topic.name}
            placeholder="Topic name"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <input
            name="description"
            defaultValue={topic.description ?? ""}
            placeholder="Description (optional)"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <div className="flex justify-end gap-3">
            
              <a href="/admin/topics" className="text-sm text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-4 py-2 no-underline transition-colors">Cancel</a>
            <button
              type="submit"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 transition-colors"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}