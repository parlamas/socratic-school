// src/app/api/students/sign-in/route.ts - CORRECT VERSION

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        emailVerified: true,
        role: true,
        firstName: true,
        lastName: true,
        username: true,
        nationality: true,
        age: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3️⃣ Check if user is a student
    if (user.role !== "student") {
      return NextResponse.json(
        { error: "Please use the instructor sign-in page" },
        { status: 403 }
      );
    }

    // 4️⃣ Verify password
    const isValidPassword = await bcrypt.compare(password, user.password || "");
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 5️⃣ Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { 
          error: "Please verify your email first. Check your inbox for the verification link.",
          needsVerification: true,
          email: user.email
        },
        { status: 403 }
      );
    }

    // 6️⃣ Return user info (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "Sign-in successful"
    });

  } catch (err) {
    console.error("Sign-in error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}