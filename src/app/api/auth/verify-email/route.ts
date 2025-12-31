// src/app/api/auth/verify-email/route.ts - FIXED VERSION

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    // Try token as-is first (most common)
    let user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpires: { gt: new Date() }
      }
    });

    // If not found, try decoded
    if (!user) {
      try {
        const decoded = decodeURIComponent(token);
        user = await prisma.user.findFirst({
          where: {
            verificationToken: decoded,
            verificationTokenExpires: { gt: new Date() }
          }
        });
      } catch (e) {
        // Decode failed, continue
      }
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Mark as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpires: null
      }
    });

    return NextResponse.redirect(new URL("/students/sign-in?verified=true", req.url));
    
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


