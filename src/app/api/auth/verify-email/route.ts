// src/app/api/auth/verify-email/route.ts - FIXED VERSION

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    // === DEBUG LOGS ===
    console.log("=== VERIFICATION DEBUG ===");
    console.log("Token received:", token?.substring(0, 20) + "...");
    console.log("Token length:", token?.length);
    console.log("Has %:", token?.includes('%'));
    console.log("Has +:", token?.includes('+'));
    console.log("Time:", new Date().toISOString());
    console.log("Environment:", process.env.VERCEL_ENV || "local");
    // ==================

    if (!token) {
      return NextResponse.json(
        { error: "Missing verification token" },
        { status: 400 }
      );
    }

    // STEP 1: Try token as-is
    let user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpires: {
          gt: new Date(),
        },
      },
    });

    // STEP 2: If not found, try decodeURIComponent
    if (!user) {
      console.log("Step 1 failed, trying decodeURIComponent...");
      try {
        const decodedToken = decodeURIComponent(token);
        console.log("Decoded token:", decodedToken.substring(0, 20) + "...");
        user = await prisma.user.findFirst({
          where: {
            verificationToken: decodedToken,
            verificationTokenExpires: {
              gt: new Date(),
            },
          },
        });
      } catch (error) {
        const err = error as Error;
        console.log("Decode failed:", err.message);
      }
    }

    // STEP 3: If still not found, try replacing + with space
    if (!user && token.includes('+')) {
      console.log("Step 2 failed, trying + as space...");
      const tokenWithSpaces = token.replace(/\+/g, ' ');
      console.log("Token with spaces:", tokenWithSpaces.substring(0, 20) + "...");
      user = await prisma.user.findFirst({
        where: {
          verificationToken: tokenWithSpaces,
          verificationTokenExpires: {
            gt: new Date(),
          },
        },
      });
    }

    // STEP 4: If still not found, try everything combined
    if (!user) {
      console.log("Step 3 failed, trying combined strategies...");
      try {
        const decodedToken = decodeURIComponent(token);
        const decodedWithSpaces = decodedToken.replace(/\+/g, ' ');
        
        user = await prisma.user.findFirst({
          where: {
            OR: [
              { verificationToken: decodedToken },
              { verificationToken: decodedWithSpaces }
            ],
            verificationTokenExpires: {
              gt: new Date(),
            },
          },
        });
      } catch (error) {
        const err = error as Error;
        console.log("Combined strategies failed:", err.message);
      }
    }

    if (!user) {
      console.log("❌ FINAL: No user found with any token variation");
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    console.log("✅ User found:", user.email);

    // Update user to mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpires: null,
      },
    });

    console.log("✅ Email verified successfully");
    
    // Redirect to sign-in page
    return NextResponse.redirect(
      new URL(`/students/sign-in?verified=true`, req.url)
    );
    
  } catch (err) {
    console.error("❌ Email verification error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}