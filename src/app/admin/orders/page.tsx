// src/app/admin/orders/page.tsx

import { prisma } from "@/lib/prisma.server";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: {
        include: {
          exercise: true,
          bundle: true,
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Orders</h1>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className={`px-5 py-4 ${
              index !== orders.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {order.user.firstName} {order.user.lastName}{" "}
                  <span className="text-gray-400 font-normal">
                    ({order.user.email})
                  </span>
                </p>
                <div className="mt-1 flex flex-col gap-0.5">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-xs text-gray-400">
                      {item.itemType === "exercise"
                        ? item.exercise?.title
                        : item.bundle?.title}{" "}
                      · €{Number(item.pricePaid).toFixed(2)}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === "paid"
                      ? "bg-green-50 text-green-700"
                      : order.status === "pending"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
                <p className="text-sm font-semibold text-gray-900">
                  €{Number(order.total).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-sm text-gray-400 px-5 py-4">No orders yet.</p>
        )}
      </div>
    </div>
  );
}