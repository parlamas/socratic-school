// src/app/api/students/sign-up/route.ts - ENHANCED DEBUGGING
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "@/lib/prisma.server";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  console.log("=== SIGNUP START ===");
  
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, username, nationality, age } = body;
    
    console.log("SIGNUP: Received data:", { email, username, nationality });
    
    // Create token
    const token = crypto.randomBytes(32).toString("hex");
    console.log("SIGNUP: Generated token:", {
      fullToken: token,
      first10: token.substring(0, 10),
      last10: token.substring(token.length - 10),
      length: token.length,
      type: typeof token
    });
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("SIGNUP: Password hashed");
    
    // Create user with all data
    const userData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
      nationality,
      age: Number(age),
      role: "student" as const,
      verificationToken: token,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    
    console.log("SIGNUP: Creating user with data:", {
      ...userData,
      password: "[HIDDEN]",
      verificationTokenExpires: userData.verificationTokenExpires.toISOString()
    });
    
    const user = await prisma.user.create({
      data: userData,
    });
    
    console.log("SIGNUP: User created successfully!", {
      userId: user.id,
      email: user.email,
      tokenInDB: user.verificationToken ? "YES" : "NO",
      tokenExpires: user.verificationTokenExpires?.toISOString()
    });
    
    // Verify the token was actually saved
    const verifyUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { verificationToken: true, verificationTokenExpires: true }
    });
    
    console.log("SIGNUP: Verification check - token in database:", {
      exists: !!verifyUser?.verificationToken,
      length: verifyUser?.verificationToken?.length,
      first10Chars: verifyUser?.verificationToken?.substring(0, 10),
      matchOriginal: verifyUser?.verificationToken === token ? "YES" : "NO"
    });
    
    // Send email
    console.log("SIGNUP: Attempting to send verification email...");
    await sendVerificationEmail(email, token);
    console.log("SIGNUP: Email sent successfully");
    
    console.log("=== SIGNUP END ===");
    
    return NextResponse.json({ 
      success: true, 
      message: "Account created! Check your email.",
      debug: {
        tokenLength: token.length,
        tokenFirst10: token.substring(0, 10),
        userId: user.id
      }
    });
    
  } catch (error) {
    console.error("=== SIGNUP ERROR ===");
    console.error("Full error:", error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    console.error("=== SIGNUP ERROR END ===");
    
    return NextResponse.json({ 
      error: "Failed to create account",
      debug: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
