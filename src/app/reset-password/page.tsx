// src/app/reset-password/page.tsx

import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="w-full max-w-md border border-gray-300 rounded-lg p-4 md:p-8 shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-black text-center">
            Reset Password
          </h1>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </main>
    }>
      <ResetPasswordClient />
    </Suspense>
  );
}