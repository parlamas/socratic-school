// src/app/students/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/students/sign-in");
  }

  // Use username if available, otherwise fall back to email
  const displayName = session.user?.username || session.user?.firstName || session.user?.email || "Student";

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Dashboard
          </h1>
          <p className="text-lg text-gray-800">
            Welcome, <span className="font-semibold text-blue-600">{displayName}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800">Introduction to Philosophy</span>
                  <span className="text-gray-800 font-medium">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800">Critical Thinking</span>
                  <span className="text-gray-800 font-medium">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Assignments</h2>
            <ul className="space-y-3">
              <li className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Essay: The Socratic Method</p>
                  <p className="text-gray-600 text-sm">Due: Dec 15, 2024</p>
                </div>
              </li>
              <li className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="ml-3">
                  <p className="text-gray-800 font-medium">Reading: Plato's Republic</p>
                  <p className="text-gray-600 text-sm">Due: Dec 18, 2024</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-gray-800">Completed quiz: "Logical Fallacies"</p>
                  <p className="text-gray-600 text-sm">Score: 85% • 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <span className="text-blue-600">💬</span>
                </div>
                <div>
                  <p className="text-gray-800">Posted in discussion: "Ethics in Modern Society"</p>
                  <p className="text-gray-600 text-sm">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              View Courses
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Submit Assignment
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Join Discussion
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              View Grades
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}