// src/components/NavBar.tsx

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b border-gray-200 px-6 py-4 flex justify-between">
      <Link href="/" className="font-semibold">
        Socratic School
      </Link>

      {!session ? (
        <div className="flex gap-4">
          <Link href="/students/sign-in">Student sign in</Link>
          <Link href="/instructor/sign-in">Instructor sign in</Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-600">
            {session.user?.email} (
            {(session.user as any).role})
          </span>
          <button
            onClick={() => signOut()}
            className="text-sm underline"
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
