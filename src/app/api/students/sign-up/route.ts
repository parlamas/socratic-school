// src/app/api/students/sign-up/route.ts - 48-CHAR TOKEN VERSION

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/lib/prisma.server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  console.log("=== SIGNUP START (48-char tokens) ===");
  
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, username, nationality, age } = body;
    
    console.log("SIGNUP: Received data:", { email, username });
    
    // CHANGE: Generate 48-char token (PROVEN TO WORK)
    const token = crypto.randomBytes(24).toString("hex");
    console.log("SIGNUP: Generated 48-char token:", {
      fullToken: token,
      length: token.length,
      first10: token.substring(0, 10)
    });
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
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
        verificationToken: token,
        verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    
    console.log("SIGNUP: User created:", user.id);
    console.log("SIGNUP: Token in response:", user.verificationToken);
    console.log("SIGNUP: Token match?", user.verificationToken === token);
    
    // Verify token was saved
    const verifyUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { verificationToken: true }
    });
    
    console.log("SIGNUP: Verification check:", {
      saved: !!verifyUser?.verificationToken,
      length: verifyUser?.verificationToken?.length,
      match: verifyUser?.verificationToken === token
    });
    
    // Send email
    await sendVerificationEmail(email, token);
    console.log("SIGNUP: Email sent");
    
    console.log("=== SIGNUP END ===");
    
    return NextResponse.json({ 
      success: true, 
      message: "Account created! Check your email.",
      debug: { tokenLength: token.length }
    });
    
  } catch (error: any) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json({ 
      error: error.code === 'P2002' ? 
        `${error.meta?.target?.[0]} already exists` : 
        "Failed to create account"
    }, { status: error.code === 'P2002' ? 400 : 500 });
  }
}
