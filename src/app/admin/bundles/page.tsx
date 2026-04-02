// src/app/admin/bundles/page.tsx

import { prisma } from "@/lib/prisma.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AdminBundlesPage() {
  const topics = await prisma.topic.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      area: true,
      exercises: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
    },
  });

  const bundles = await prisma.bundle.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      topic: { include: { area: true } },
      bundleExercises: { include: { exercise: true } },
    },
  });

  async function createBundle(formData: FormData) {
    "use server";
    const topicId = formData.get("topicId") as string;
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const exerciseIds = formData.getAll("exerciseIds") as string[];

    await prisma.bundle.create({
      data: {
        topicId,
        title,
        price,
        bundleExercises: {
          create: exerciseIds.map((exerciseId) => ({ exerciseId })),
        },
      },
    });
    revalidatePath("/admin/bundles");
    redirect("/admin/bundles");
  }

  async function toggleBundle(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = await prisma.bundle.findUnique({ where: { id } });
    if (!current) return;
    await prisma.bundle.update({ where: { id }, data: { isActive: !current.isActive } });
    revalidatePath("/admin/bundles");
    redirect("/admin/bundles");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Bundles</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-base font-medium text-gray-900 mb-4">New bundle</h2>
        <form action={createBundle} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              name="topicId"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
              <option value="" disabled>Select topic</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.area.name} → {t.name}
                </option>
              ))}
            </select>
            <input
              name="title"
              required
              placeholder="Bundle title"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Price (€)"
              className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-2">Select exercises to include</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topics.flatMap((t) =>
                t.exercises.map((ex) => (
                  <label
                    key={ex.id}
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="exerciseIds"
                      value={ex.id}
                      className="rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-400 mr-1">
                      {t.area.name} → {t.name}
                    </span>
                    {ex.title}
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 transition-colors"
            >
              Create bundle
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {bundles.map((bundle, index) => (
          <div
            key={bundle.id}
            className={`flex items-center justify-between px-5 py-4 ${
              index !== bundles.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-xs text-gray-400 mb-0.5">
                {bundle.topic.area.name} → {bundle.topic.name}
              </p>
              <p className="text-sm font-medium text-gray-900">{bundle.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {bundle.bundleExercises.length} exercises · €{Number(bundle.price).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  bundle.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {bundle.isActive ? "Active" : "Inactive"}
              </span>
              <form action={toggleBundle}>
                <input type="hidden" name="id" value={bundle.id} />
                <button
                  type="submit"
                  className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {bundle.isActive ? "Deactivate" : "Activate"}
                </button>
              </form>
            </div>
          </div>
        ))}
        {bundles.length === 0 && (
          <p className="text-sm text-gray-400 px-5 py-4">No bundles yet.</p>
        )}
      </div>
    </div>
  );
}