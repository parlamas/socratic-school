// src/app/api/instructor/sign-in/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // This route is deprecated - use NextAuth instead
  return NextResponse.json(
    { 
      error: "This endpoint is deprecated. Please use NextAuth authentication.",
      message: "Use /api/auth/signin instead"
    },
    { status: 410 } // 410 Gone
  );
}