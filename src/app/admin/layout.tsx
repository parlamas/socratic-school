// src/app/admin/layout.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-6 overflow-x-auto">
          <span className="text-sm font-semibold text-gray-900 shrink-0">
            Admin
          </span>
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-900 no-underline shrink-0"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/areas"
            className="text-sm text-gray-500 hover:text-gray-900 no-underline shrink-0"
          >
            Areas
          </Link>
          <Link
            href="/admin/topics"
            className="text-sm text-gray-500 hover:text-gray-900 no-underline shrink-0"
          >
            Topics
          </Link>
          <Link
            href="/admin/exercises"
            className="text-sm text-gray-500 hover:text-gray-900 no-underline shrink-0"
          >
            Exercises
          </Link>
          <Link
            href="/admin/bundles"
            className="text-sm text-gray-500 hover:text-gray-900 no-underline shrink-0"
          >
            Bundles
          </Link>
          <Link
            href="/admin/orders"
            className="text-sm text-gray-500 hover:text-gray-900 no-underline shrink-0"
          >
            Orders
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}