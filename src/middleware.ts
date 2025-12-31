// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect these paths
  const isStudentRoute = pathname.startsWith("/students");
  const isInstructorRoute = pathname.startsWith("/instructor");

  if (!isStudentRoute && !isInstructorRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Not logged in
  if (!token) {
    const signInUrl = isInstructorRoute
      ? "/instructor/sign-in"
      : "/students/sign-in";

    return NextResponse.redirect(new URL(signInUrl, req.url));
  }

  // Logged in, but wrong role
  if (
    (isStudentRoute && token.role !== "student") ||
    (isInstructorRoute && token.role !== "instructor")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/students/:path*", "/instructor/:path*"],
};
