// src/app/api/instructor/sign-up/route.ts - COMPLETE VERSION
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/lib/prisma.server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const email = body.email;
    const password = body.password;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const username = body.username;
    const nationality = body.nationality;
    const age = body.age;

    if (!email || !password || !firstName || !lastName || !username || !nationality || !age) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username }
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    console.log("Generated verification token for instructor:", verificationToken.substring(0, 20) + "...");
    console.log("Token expires:", verificationTokenExpires);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        username: username,
        nationality: nationality,
        age: parseInt(age),
        role: "instructor",
        verificationToken: verificationToken,
        verificationTokenExpires: verificationTokenExpires,
        emailVerified: null
      }
    });

    console.log("Instructor saved to database:");
    console.log("  Email:", user.email);
    console.log("  Has verification token:", !!user.verificationToken);
    console.log("  Token in DB:", user.verificationToken?.substring(0, 20) + "...");
    console.log("  Token length in DB:", user.verificationToken?.length);
    console.log("  Token expires in DB:", user.verificationTokenExpires);
    console.log("  Email verified in DB:", user.emailVerified);

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      success: true,
      message: "Instructor account created successfully! Please check your email to verify your account.",
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
    console.error("Error in instructor sign-up:", error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Registration failed. Please try again later." },
      { status: 500 }
    );
  }
}