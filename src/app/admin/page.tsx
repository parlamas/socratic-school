// src/app/admin/page.tsx

import { prisma } from "@/lib/prisma.server";
import Link from "next/link";

export default async function AdminDashboard() {
  const [areas, topics, exercises, bundles, orders, users] = await Promise.all([
    prisma.area.count(),
    prisma.topic.count(),
    prisma.exercise.count(),
    prisma.bundle.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "Areas", value: areas, href: "/admin/areas" },
    { label: "Topics", value: topics, href: "/admin/topics" },
    { label: "Exercises", value: exercises, href: "/admin/exercises" },
    { label: "Bundles", value: bundles, href: "/admin/bundles" },
    { label: "Orders", value: orders, href: "/admin/orders" },
    { label: "Users", value: users, href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="block bg-white border border-gray-200 rounded-xl p-4 no-underline hover:border-indigo-300 transition-colors"
          >
            <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}