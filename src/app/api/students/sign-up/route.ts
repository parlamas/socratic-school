// src/app/api/students/sign-up/route.ts - COMPLETE FIXED VERSION

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

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate age
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 100) {
      return NextResponse.json(
        { error: "Age must be a number between 13 and 100" },
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

    // 5️⃣ Generate verification token BEFORE creating user
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    console.log("Generated student token for", email, ":", verificationToken);
    console.log("Token expires:", verificationTokenExpires);

    // 6️⃣ Create student WITH verification token (single operation) - FIXED!
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        nationality,
        age: ageNum,
        role: "student",
        verificationToken,
        verificationTokenExpires,
      },
    });

    console.log("Student created with ID:", user.id);

    // 7️⃣ Send verification email
    try {
      console.log("Attempting to send verification email to:", email);
      await sendVerificationEmail(email, verificationToken);

      return NextResponse.json({ 
        success: true,
        message: "Account created! Please check your email to verify your account.",
      });
      
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      
      return NextResponse.json({ 
        success: true,
        message: "Account created, but we couldn't send the verification email.",
        warning: "email_not_sent",
      });
    }
    
  } catch (err) {
    console.error("Sign-up error:", err);
    
    // More detailed error logging
    if (err instanceof Error) {
      console.error("Error name:", err.name);
      console.error("Error stack:", err.stack);
      
      // Handle unique constraint errors
      if (err.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Email or username already exists" },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        ...(process.env.NODE_ENV === "development" && { 
          details: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined
        })
      },
      { status: 500 }
    );
  }
}