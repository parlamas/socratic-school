// src/app/reset-password/page.tsx

import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
