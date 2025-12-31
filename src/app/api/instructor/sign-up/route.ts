// src/app/api/instructor/sign-up/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, username, nationality, age } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user - AUTO VERIFIED
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        nationality,
        age: parseInt(age),
        role: "instructor",
        emailVerified: new Date() // AUTO VERIFIED - NO TOKEN NEEDED
      }
    });

    return NextResponse.json({
      success: true,
      message: "Instructor registered successfully. You can now log in."
    });

  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}

