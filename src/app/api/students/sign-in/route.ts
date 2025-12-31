// src/app/api/students/sign-in/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // This is a deprecated endpoint - redirect to NextAuth
    return NextResponse.json({
      error: "This endpoint is deprecated",
      message: "Please use NextAuth authentication. Update your sign-in form to use signIn() from next-auth/react",
      redirect: "/students/sign-in"
    }, { status: 410 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}