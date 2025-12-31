// src/app/api/students/sign-up/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/lib/prisma.server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
      username,
      nationality,
      age,
    } = await req.json();

    // 1️⃣ Validate required fields
    if (
      !email ||
      !password ||
      !passwordConfirm ||
      !firstName ||
      !lastName ||
      !username ||
      !nationality ||
      !age
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== passwordConfirm) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // 2️⃣ Check email uniqueness
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // 3️⃣ Check username uniqueness
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5️⃣ Create student
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        nationality,
        age: Number(age),
        role: "student",
      },
    });

    try {
      // 6️⃣ Generate verification token
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

      await prisma.user.update({
        where: { id: user.id },
        data: {
          verificationToken: token,
          verificationTokenExpires: expires,
        },
      });

      // 7️⃣ Send verification email
      await sendVerificationEmail(email, token);

      return NextResponse.json({ 
        success: true,
        message: "Account created! Please check your email to verify your account."
      });
      
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      
      // Still return success, but notify user to contact support
      return NextResponse.json({ 
        success: true,
        message: "Account created, but we couldn't send the verification email. Please contact support or try signing in to resend verification.",
        warning: "email_not_sent"
      });
    }
    
  } catch (err) {
    console.error("Sign-up error:", err);
    return NextResponse.json(
      { 
        error: "Internal server error",
        // Include more details in development
        ...(process.env.NODE_ENV === "development" && { 
          details: err instanceof Error ? err.message : String(err) 
        })
      },
      { status: 500 }
    );
  }
}