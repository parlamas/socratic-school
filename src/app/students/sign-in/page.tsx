// src/app/students/sign-in/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentSignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/students/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Invalid credentials");
      return;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-white flex justify-center pt-24">
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
          Student sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email or username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 disabled:opacity-50 transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          {/* Sign up link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link 
                href="/students/sign-up" 
                className="text-black font-medium hover:underline"
              >
                Sign up as a student
              </Link>
            </p>
          </div>

          {/* Forgot password link */}
          <div className="text-center">
            <Link 
              href="/forgot-password" 
              className="text-sm text-gray-600 hover:text-black hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Optional: Switch to instructor login */}
          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm">
              Are you an instructor?{" "}
              <Link 
                href="/instructor/sign-in" 
                className="text-black font-medium hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}