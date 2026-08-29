// src/app/exercises/page.tsx

import Link from "next/link";

const exercises = [
  { href: "/english/ex-001", title: "English — Articles", desc: "Fill in the blank: a, an, some, the, any, or nothing" },
  { href: "/english/ex-002", title: "English — Exercise 2", desc: "" },
    { href: "/danish/lesson-001", title: "Danish — Lesson 1", desc: "" },
  { href: "/danish/ex-001", title: "Danish — Exercise 1", desc: "" },
  { href: "/danish/lesson-002", title: "Danish — Lesson 2", desc: "" },
  { href: "/danish/lesson-003", title: "Danish — Lesson 3", desc: "For vs. fordi — cause vs. explanation" },
  { href: "/danish/ex-002", title: "Danish — Exercise 2", desc: "" },
  { href: "/multilingual/ex-001", title: "Multilingual — Exercise 1", desc: "" },
  { href: "/multilingual/ex-002", title: "Multilingual — Exercise 2", desc: "" },
  { href: "/math/ekp", title: "Math — LCM (Ελάχιστο Κοινό Πολλαπλάσιο)", desc: "" },
  { href: "/math/mkd", title: "Math — GCD (Μέγιστος Κοινός Διαιρέτης)", desc: "" },
  { href: "/math/ld", title: "Math — Long Division", desc: "" },
  { href: "/math/mc", title: "Math — Fractions & Mixed Numbers", desc: "" },
  { href: "/grammar", title: "Grammar", desc: "" },
  { href: "/metaphysics", title: "Metaphysics", desc: "" },
  { href: "/republic", title: "The Republic", desc: "" },
  { href: "/symposium", title: "Symposium", desc: "" },
];

export default function ExercisesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="font-dm max-w-xl mx-auto px-6 py-10">
        <h1 className="font-garamond text-2xl font-medium mb-2">Exercises</h1>
        <p className="text-sm text-gray-500 mb-8">
          Free to try — no account needed.
        </p>

        <div className="flex flex-col gap-3">
          {exercises.map((ex) => (
            <Link
              key={ex.href}
              href={ex.href}
              className="flex flex-col border border-gray-200 rounded-xl px-5 py-4 hover:border-gray-400 hover:bg-gray-50 transition-colors no-underline"
            >
              <span className="font-garamond text-base font-medium text-gray-900">
                {ex.title}
              </span>
              {ex.desc && (
                <span className="text-xs text-gray-500 mt-0.5">{ex.desc}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}