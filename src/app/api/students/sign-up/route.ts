// src/app/api/students/sign-up/route.ts - COMPLETE

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/lib/prisma.server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      username, 
      nationality, 
      age 
    } = body;

    // ============ VALIDATION CODE ============
    if (!email || !password || !firstName || !lastName || !username || !nationality || !age) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email exists
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Check if username exists
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }
    // =========================================

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ GENERATE VERIFICATION TOKEN
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    console.log("🔐 Generated token:", {
      token: verificationToken,
      length: verificationToken.length,
      expires: verificationTokenExpires
    });

    // ✅ CREATE USER WITH TOKEN (NOT VERIFIED)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        nationality,
        age: parseInt(age, 10),
        role: "student",
        verificationToken,
        verificationTokenExpires,
        emailVerified: null // NOT verified yet
      }
    });

    // ============ ADD YOUR LOGGING HERE ============
    console.log("💾 SAVED TO DATABASE:");
    console.log("   Email:", user.email);
    console.log("   Verification token saved:", user.verificationToken);
    console.log("   Token length:", user.verificationToken?.length);
    console.log("   Expires:", user.verificationTokenExpires);
    console.log("   Email verified (should be null):", user.emailVerified);
    console.log("   Full token (first 50 chars):", user.verificationToken?.substring(0, 50));
    // ================================================

    // ✅ SEND VERIFICATION EMAIL
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      success: true,
      message: "Account created! Please check your email to verify your account.",
    }, { status: 201 });

  } catch (error: any) {
    // ============ ERROR HANDLING ============
    console.error("Student sign-up error:", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred during registration. Please try again." },
      { status: 500 }
    );
    // =========================================
  }
}