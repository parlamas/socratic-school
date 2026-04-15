// src/app/admin/exercises/page.tsx

import { prisma } from "@/lib/prisma.server";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ExerciseBuilderWrapper from "./ExerciseBuilderWrapper";

interface Props {
  searchParams: Promise<{ topicId?: string }>;
}

export default async function AdminExercisesPage({ searchParams }: Props) {
  const { topicId } = await searchParams;

  const topics = await prisma.topic.findMany({
    orderBy: { sortOrder: "asc" },
    include: { area: true },
  });

  const exercises = await prisma.exercise.findMany({
    where: topicId ? { topicId } : undefined,
    orderBy: { sortOrder: "asc" },
    include: { topic: { include: { area: true } } },
  });

  async function createExercise(formData: FormData) {
    "use server";
    const topicId = formData.get("topicId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const type = formData.get("type") as string;
    const rawContent = formData.get("content") as string;

    let content: unknown;
    try {
      content = JSON.parse(rawContent);
    } catch {
      return;
    }

    await prisma.exercise.create({
      data: {
        topicId,
        title,
        description,
        price,
        type: type as never,
        content: content as never,
      },
    });
    revalidatePath("/admin/exercises");
    redirect("/admin/exercises");
  }

  async function deleteExercise(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.exercise.delete({ where: { id } });
    revalidatePath("/admin/exercises");
    redirect("/admin/exercises");
  }

  async function toggleExercise(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = await prisma.exercise.findUnique({ where: { id } });
    if (!current) return;
    await prisma.exercise.update({ where: { id }, data: { isActive: !current.isActive } });
    revalidatePath("/admin/exercises");
    redirect("/admin/exercises");
  }


  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Exercises</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-base font-medium text-gray-900 mb-4">New exercise</h2>
        <form action={createExercise} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              name="topicId"
              required
              defaultValue={topicId ?? ""}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
              <option value="" disabled>Select topic</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.area.name} → {t.name}
                </option>
              ))}
            </select>
            <select
              name="type"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
              <option value="" disabled>Type</option>
              <option value="multiple_choice">Multiple choice</option>
              <option value="fill_in_the_blank">Fill in the blank</option>
              <option value="translation">Translation</option>
              <option value="matching">Matching</option>
              <option value="true_false">True / false</option>
              <option value="open_ended">Open ended</option>
            </select>
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
          <input
            name="title"
            required
            placeholder="Exercise title"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <input
            name="description"
            placeholder="Short description (optional)"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <ExerciseBuilderWrapper />
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 transition-colors"
            >
              Create exercise
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {exercises.map((ex, index) => (
          <div
            key={ex.id}
            className={`flex items-center justify-between px-5 py-4 ${
              index !== exercises.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="flex-1 min-w-0 pr-4">
              <p className="text-xs text-gray-400 mb-0.5">
                {ex.topic.area.name} → {ex.topic.name}
              </p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {ex.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {ex.type.replace(/_/g, " ")} · €{Number(ex.price).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  ex.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {ex.isActive ? "Active" : "Inactive"}
              </span>
              <form action={toggleExercise}>
                <input type="hidden" name="id" value={ex.id} />
                <button
                  type="submit"
                  className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {ex.isActive ? "Deactivate" : "Activate"}
                </button>
              </form>
              <Link
                href={`/admin/exercises/${ex.id}`}
                className="text-xs text-indigo-600 hover:text-indigo-800 no-underline border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors"
              >
                Edit
              </Link>
              <form action={deleteExercise}>
                <input type="hidden" name="id" value={ex.id} />
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
        {exercises.length === 0 && (
          <p className="text-sm text-gray-400 px-5 py-4">No exercises yet.</p>
        )}
      </div>
    </div>
  );
}