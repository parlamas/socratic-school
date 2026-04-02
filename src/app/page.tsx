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
    <main className="bg-white min-h-screen flex flex-col items-center pt-0">
      <div className="max-w-2xl px-6 w-full">
        {/* Tutor Ad - Now at the very top */}
        <div className="max-w-full mx-auto mt-4 mb-8 p-5 bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Philosophical statement */}
          <div className="text-center mb-4 pb-3 border-b-2 border-gray-100">
            <div className="wow">
              Η επιστροφή στην Κλασική Ελλάδα είναι ο δρόμος προς τα εμπρός.
            </div>
            <div className="wow">
              Going Back To Classical Greece Is The Way Forward
            </div>
          </div>

          {/* Socratic Methodology with self-actualization */}
          <div className="text-center mb-4">
            <div className="wow1">
              Σωκρατική Μεθοδολογία
            </div>
            <div className="wow1">
              Socratic Methodology
            </div>
            <div className="wow33">
              self-actualization — προσωπική καταξίωση
            </div>
          </div>

          <div className="text-center mb-4 pb-2 border-b-2 border-gray-100">
            <div className="block text-lg font-semibold text-gray-800 mb-1">
              Ισίδωρος Παρλαμάς
            </div>
            <div className="block text-sm text-gray-600">
              Isidoros Parlamas
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2.5 mb-2 text-sm">
              <span>📧</span>
              <a href="mailto:parlamas@live.com" className="text-blue-600 no-underline hover:underline">
                parlamas@live.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 mb-2 text-sm">
              <span>📱</span>
              <a href="tel:+4523950606" className="text-blue-600 no-underline hover:underline">
                +45 23 95 06 06
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <span>💼</span>
              <a href="https://www.linkedin.com/in/horistics/" target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline hover:underline">
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <span>💼</span>
              <a href="https://socratic-school.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline hover:underline">
                socratic-school.com
              </a>
            </div>
          </div>

          {/* Experience badge */}
          <div className="text-center mb-3">
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-medium">
              <span>Πολυετής Πείρα</span>
              <span className="mx-2">•</span>
              <span>Many years of professional experience</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-4">
            <span className="bg-green-600 text-white px-4 py-1.5 rounded-full font-semibold text-sm">
              €50/60min
            </span>
            <span className="bg-yellow-500 text-gray-800 px-4 py-1.5 rounded-full font-semibold text-sm">
              ONLINE
            </span>
          </div>

          <div className="text-center mb-3">
            <div className="block text-base font-semibold text-gray-800 mb-0.5">
              ΟΛΑ ΤΑ ΜΑΘΗΜΑΤΑ
            </div>
            <div className="block text-sm text-gray-600 uppercase tracking-wide">
              ALL SUBJECTS
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 pt-3 border-t border-gray-200">
            Από 1η Δημοτικού έως 3η Λυκείου • 1st to 12th Grades
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Socratic School
        </h1>

        <p className="text-sm text-gray-700 mb-3">
          Socratic School is an online learning environment built around
          dialogue, inquiry, and disciplined thinking.
        </p>

        <p className="text-sm text-gray-700 mb-6">
          It brings together learners and instructors in a shared space where
          understanding is developed through questions, discussion, and careful
          reasoning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-base font-medium mb-1.5">Students</h2>
            <p className="text-xs text-gray-700 mb-2">
              Join as a student to participate in courses, discussions, and
              guided learning.
            </p>
            <div className="flex gap-3">
              <a href="/students/sign-up" className="text-xs underline">
                Sign up
              </a>
              <a href="/students/sign-in" className="text-xs underline">
                Sign in
              </a>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-base font-medium mb-1.5">Instructors</h2>
            <p className="text-xs text-gray-700 mb-2">
              Join as an instructor to design courses, guide dialogue, and lead
              structured inquiry.
            </p>
            <div className="flex gap-3">
              <a href="/instructor/sign-up" className="text-xs underline">
                Sign up
              </a>
              <a href="/instructor/sign-in" className="text-xs underline">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}