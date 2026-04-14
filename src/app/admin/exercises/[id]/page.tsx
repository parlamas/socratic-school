// src/app/admin/exercises/[id]/page.tsx

import { prisma } from "@/lib/prisma.server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import ExerciseBuilderWrapper from "@/app/admin/exercises/ExerciseBuilderWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditExercisePage({ params }: Props) {
  const { id } = await params;

  const exercise = await prisma.exercise.findUnique({
    where: { id },
    include: { topic: { include: { area: true } } },
  });

  if (!exercise) notFound();

  const topics = await prisma.topic.findMany({
    orderBy: { sortOrder: "asc" },
    include: { area: true },
  });

  async function updateExercise(formData: FormData) {
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

    await prisma.exercise.update({
      where: { id },
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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Edit exercise
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form action={updateExercise} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              name="topicId"
              required
              defaultValue={exercise.topicId}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.area.name} → {t.name}
                </option>
              ))}
            </select>
            <select
              name="type"
              required
              defaultValue={exercise.type}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
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
              defaultValue={Number(exercise.price)}
              className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>
          <input
            name="title"
            required
            defaultValue={exercise.title}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <input
            name="description"
            defaultValue={exercise.description ?? ""}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
          />
          <ExerciseBuilderWrapper initial={exercise.content as never} />
          <div className="flex justify-end gap-3">
            
              <a href="/admin/exercises"
              className="text-sm text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-4 py-2 no-underline transition-colors">
              Cancel
            </a>
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