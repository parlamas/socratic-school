// src/app/forgot-password/page.tsx

"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSent(true);
  }

  if (sent) {
    return (
      <main className="min-h-screen flex justify-center pt-32">
        <p className="text-gray-700">
          If an account exists for this email, a reset link has been sent.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center pt-32">
      <form onSubmit={handleSubmit} className="max-w-sm w-full px-6">
        <h1 className="text-2xl font-semibold mb-6">Forgot password</h1>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-4"
        />

        <button className="underline">Send reset link</button>
      </form>
    </main>
  );
}
