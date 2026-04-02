// src/app/admin/SignOutButton.tsx

"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-red-400 hover:text-red-600 no-underline shrink-0 ml-auto"
    >
      Sign out
    </button>
  );
}