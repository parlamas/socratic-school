// src/app/page.tsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";


export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // Logged in → redirect by role
  if (session?.user) {
    const role = (session.user as any).role;

    if (role === "student") {
      redirect("/students");
    }

    if (role === "instructor") {
      redirect("/instructor");
    }
  }

  // Not logged in → public landing page
  return (
    <main className="bg-white min-h-screen flex justify-center pt-32">
      <div className="max-w-2xl px-6">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          Socratic School
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Socratic School is an online learning environment built around
          dialogue, inquiry, and disciplined thinking.
        </p>

        <p className="text-lg text-gray-700 mb-10">
          It brings together learners and instructors in a shared space where
          understanding is developed through questions, discussion, and careful
          reasoning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-3">Students</h2>
            <p className="text-gray-700 mb-4">
              Join as a student to participate in courses, discussions, and
              guided learning.
            </p>
            <div className="flex gap-4">
              <a href="/students/sign-up" className="underline text-sm">
                Sign up
              </a>
              <a href="/students/sign-in" className="underline text-sm">
                Sign in
              </a>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-3">Instructors</h2>
            <p className="text-gray-700 mb-4">
              Join as an instructor to design courses, guide dialogue, and lead
              structured inquiry.
            </p>
            <div className="flex gap-4">
              <a href="/instructor/sign-up" className="underline text-sm">
                Sign up
              </a>
              <a href="/instructor/sign-in" className="underline text-sm">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
