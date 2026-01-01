// src/app/api/instructor/sign-up/route.ts - FIXED

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
      affiliation,
      statement,
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
        { error: "All required fields must be filled" },
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
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      return NextResponse.json(
        { error: "Age must be a number between 18 and 100" },
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

    // 5️⃣ Generate verification token 
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    console.log("INSTRUCTOR TOKEN DEBUG - Generated:", verificationToken.substring(0, 20) + "...");

    // 6️⃣ Create instructor WITH verification token
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        nationality,
        age: ageNum,
        role: "instructor",
        affiliation: affiliation || null,
        statement: statement || null,
        verificationToken,
        verificationTokenExpires,
      },
    });

    console.log("INSTRUCTOR TOKEN DEBUG - User created:", user.id);

    // 7️⃣ Send verification email
    try {
      console.log("INSTRUCTOR TOKEN DEBUG - Sending email with token:", verificationToken.substring(0, 20) + "...");
      await sendVerificationEmail(email, verificationToken);

      return NextResponse.json({ 
        success: true,
        message: "Instructor account created! Please check your email to verify your account.",
      });
      
    } catch (emailError) {
      console.error("INSTRUCTOR TOKEN DEBUG - Email failed:", emailError);
      
      return NextResponse.json({ 
        success: true,
        message: "Account created, but we couldn't send the verification email.",
        warning: "email_not_sent",
      });
    }
    
  } catch (err) {
    console.error("Instructor sign-up error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
