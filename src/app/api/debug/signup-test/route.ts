// src/app/api/debug/signup-test/route.ts - SIMPLE SIGNUP TEST
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    
    console.log("SIMPLE SIGNUP TEST: Starting with email:", email);
    
    const testData = {
      email: email,
      password: await bcrypt.hash("testpassword123", 12),
      firstName: "Test",
      lastName: "User",
      username: `testuser${Date.now()}`,
      nationality: "Test",
      age: 25,
      role: "student" as const,
      // Try WITHOUT verification token first
    };
    
    console.log("SIMPLE SIGNUP TEST: Creating user without token...");
    
    const user = await prisma.user.create({
      data: testData,
    });
    
    console.log("SIMPLE SIGNUP TEST: User created:", user.id);
    
    return NextResponse.json({
      success: true,
      message: "Simple signup worked!",
      userId: user.id,
      email: user.email,
      verificationToken: user.verificationToken,
      emailVerified: user.emailVerified
    });
    
  } catch (error) {
    console.error("SIMPLE SIGNUP TEST ERROR:", error);
    
    return NextResponse.json({
      error: "Simple signup failed",
      message: error instanceof Error ? error.message : String(error),
      code: (error as any).code,
      meta: (error as any).meta,
      details: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
}
