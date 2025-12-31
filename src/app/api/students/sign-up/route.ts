// src/app/api/students/sign-up/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.server";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract fields from the request
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

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with AUTO-VERIFICATION
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
        emailVerified: new Date() // AUTO-VERIFIED - no email needed
      }
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Account created successfully! You can now log in.",
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
    console.error("Student sign-up error:", error);
    
    // Handle specific database errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "An error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}