// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define public routes that don't need authentication
  const publicRoutes = [
    "/students/sign-in",
    "/students/sign-up", 
    "/instructor/sign-in",
    "/instructor/sign-up",
  ];

  // Check if current route is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If it's a public route, allow access without checking authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Only protect student and instructor routes (excluding public ones above)
  const isStudentRoute = pathname.startsWith("/students");
  const isInstructorRoute = pathname.startsWith("/instructor");

  if (!isStudentRoute && !isInstructorRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Not logged in - redirect to appropriate sign-in page
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