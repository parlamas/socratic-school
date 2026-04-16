//src/app/page.tsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const role = (session.user as any).role;
    if (role === "student") redirect("/students");
    if (role === "instructor") redirect("/instructor");
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-garamond { font-family: 'EB Garamond', serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-dm max-w-xl mx-auto px-6 py-10">

        {/* Try exercises banner */}
        
          <a href="/students"
          className="flex items-center justify-between w-full bg-gray-900 rounded-xl px-6 py-4 mb-8 hover:bg-gray-800 transition-colors no-underline"
        >
          <div>
            <p className="font-garamond text-lg font-medium text-white mb-0.5">
              Try the exercises
            </p>
            <p className="text-xs text-gray-400">
              Get a feel for the material — no account needed for the first few questions.
            </p>
          </div>
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>

        {/* Site header */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-7 h-7 rounded-full border border-gray-900 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1"/>
              <circle cx="7" cy="7" r="2" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xs font-medium tracking-widest uppercase text-gray-500">
            Socratic School
          </span>
        </div>

        {/* Tutor card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">

          {/* Philosophy */}
          <div className="text-center pb-6 mb-6 border-b border-gray-100">
            <p className="font-garamond italic text-base leading-relaxed text-gray-500 mb-1">
              Η επιστροφή στην Κλασική Ελλάδα είναι ο δρόμος προς τα εμπρός.
            </p>
            <p className="font-garamond text-sm leading-relaxed text-gray-400">
              Going Back To Classical Greece Is The Way Forward
            </p>
          </div>

          {/* Methodology */}
          <div className="text-center mb-6">
            <p className="font-garamond text-xl font-medium mb-1">
              Σωκρατική Μεθοδολογία
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
              Socratic Methodology
            </p>
            <p className="text-xs text-gray-400">
              self-actualization — προσωπική καταξίωση
            </p>
          </div>

          <hr className="border-gray-100 mb-6" />

          {/* Name */}
          <div className="text-center mb-6">
            <p className="font-garamond text-lg font-medium mb-1">
              Ισίδωρος Παρλαμάς
            </p>
            <p className="text-xs tracking-wide text-gray-500">
              Isidoros Parlamas
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-2.5 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="3" width="14" height="10" rx="1.5"/>
                <path d="M1 4.5l7 5 7-5"/>
              </svg>
              <a href="mailto:mind@horistics.com" className="text-blue-600 hover:underline">
                mind@horistics.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="4" y="1" width="8" height="14" rx="1.5"/>
                <circle cx="8" cy="12" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
              <a href="tel:+4523950606" className="text-blue-600 hover:underline">
                +45 23 95 06 06
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="1" width="14" height="14" rx="2"/>
                <path d="M5 6h.01M5 8v4M8 6v6M8 8a2 2 0 1 1 4 0v4"/>
              </svg>
              <a href="https://www.linkedin.com/in/horistics/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="8" cy="8" r="6"/>
                <path d="M8 2c-1.5 2-2 3.5-2 6s.5 4 2 6M8 2c1.5 2 2 3.5 2 6s-.5 4-2 6M2 8h12"/>
              </svg>
              <a href="https://socratic-school.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                socratic-school.com
              </a>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs font-medium px-3.5 py-1 rounded-full border border-gray-300 text-gray-700">
              €50 / 60 min
            </span>
            <span className="text-xs font-medium px-3.5 py-1 rounded-full bg-gray-100 text-gray-600">
              Online
            </span>
            <span className="text-xs font-medium px-3.5 py-1 rounded-full bg-gray-100 text-gray-600">
              Πολυετής πείρα · Many years of experience
            </span>
          </div>

          {/* Subjects */}
          <div className="text-center">
            <p className="font-garamond text-base font-medium mb-1">Όλα τα Μαθήματα</p>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">All subjects</p>
            <p className="text-xs text-gray-400">
              Από 1η Δημοτικού έως 3η Λυκείου · 1st to 12th grades
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-8">
          <h1 className="font-garamond text-2xl font-medium mb-3">
            Socratic School
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-2">
            An online learning environment built around dialogue, inquiry, and disciplined thinking.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            It brings together learners and instructors in a shared space where understanding is developed through questions, discussion, and careful reasoning.
          </p>
        </div>

        {/* Try exercises */}
        <div className="mb-6">
          
            <a href="/students"
            className="flex items-center justify-between w-full border border-gray-900 rounded-xl px-6 py-4 hover:bg-gray-50 transition-colors no-underline">
            <div>
              <p className="font-garamond text-lg font-medium text-gray-900 mb-0.5">
                Try the exercises
              </p>
              <p className="text-xs text-gray-500">
                Get a feel for the material — no account needed for the first few questions.
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </div>

        {/* Portals */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-medium mb-1.5">Students</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Participate in courses, discussions, and guided learning.
            </p>
            <div className="flex gap-3">
              <a href="/students/sign-up" className="text-xs text-blue-600 hover:underline">Sign up</a>
              <a href="/students/sign-in" className="text-xs text-blue-600 hover:underline">Sign in</a>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-medium mb-1.5">Instructors</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Design courses, guide dialogue, and lead structured inquiry.
            </p>
            <div className="flex gap-3">
              <a href="/instructor/sign-up" className="text-xs text-blue-600 hover:underline">Sign up</a>
              <a href="/instructor/sign-in" className="text-xs text-blue-600 hover:underline">Sign in</a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
