// src/app/api/students/sign-up/route.ts - FIXED

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/lib/prisma.server";
import { sendVerificationEmail } from "@/lib/email"; // Make sure this import exists!

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

    // ... validation code ...

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ GENERATE VERIFICATION TOKEN
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

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
        // ✅ STORE TOKEN (for verification)
        verificationToken,
        verificationTokenExpires,
        // ❌ DON'T set emailVerified here!
        emailVerified: null // NOT verified yet
      }
    });

    // ✅ SEND VERIFICATION EMAIL
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      success: true,
      message: "Account created! Please check your email to verify your account.",
    }, { status: 201 });

  } catch (error: any) {
    console.error("Student sign-up error:", error);
    // ... error handling ...
  }
}