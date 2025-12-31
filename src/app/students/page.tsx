// src/app/students/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="bg-white min-h-screen flex justify-center pt-24">
      <div className="w-full max-w-5xl px-6">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-700">
            Welcome{session?.user?.email ? `, ${session.user.email}` : ""}.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-3">
              Your Courses
            </h2>
            <p className="text-gray-700">
              Courses you are enrolled in will appear here.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-3">
              Ongoing Discussions
            </h2>
            <p className="text-gray-700">
              Active discussions and inquiries will be listed here.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 md:col-span-2">
            <h2 className="text-xl font-medium mb-3">
              Learning Activity
            </h2>
            <p className="text-gray-700">
              Your recent learning activity and progress will be summarized
              here.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
