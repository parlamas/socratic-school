// src/app/reset-password/page.tsx

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    router.push("/");
  }

  return (
    <main className="min-h-screen flex justify-center pt-32">
      <form onSubmit={handleSubmit} className="max-w-sm w-full px-6">
        <h1 className="text-2xl font-semibold mb-6">Reset password</h1>

        <label className="block mb-2">New password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4"
        />

        <button className="underline">Set new password</button>
      </form>
    </main>
  );
}
