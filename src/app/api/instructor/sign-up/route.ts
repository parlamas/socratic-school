// src/app/api/instructor/sign-up/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.server";

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

    // Validate required fields
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create instructor with AUTO-VERIFICATION
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        nationality,
        age: parseInt(age, 10),
        role: "instructor",
        emailVerified: new Date() // AUTO-VERIFIED
      }
    });

    return NextResponse.json({
      success: true,
      message: "Instructor account created successfully! You can now log in.",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Instructor sign-up error:", error);
    
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
  }
}