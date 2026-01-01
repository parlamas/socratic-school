// src/app/api/debug/tokens/route.ts - DIAGNOSTIC ROUTE
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.server";
import crypto from "crypto";

export async function GET() {
  try {
    // Get all users with tokens
    const usersWithTokens = await prisma.user.findMany({
      where: {
        verificationToken: { not: null }
      },
      select: {
        id: true,
        email: true,
        verificationToken: true,
        verificationTokenExpires: true,
        emailVerified: true
      }
    });
    
    // Generate a test token to show format
    const testToken = crypto.randomBytes(32).toString("hex");
    
    return NextResponse.json({
      message: "Token Diagnostic",
      testTokenFormat: {
        length: testToken.length,
        sample: testToken.substring(0, 10) + "..." + testToken.substring(testToken.length - 10),
        fullSample: testToken
      },
      usersWithTokens: usersWithTokens.map(user => ({
        id: user.id,
        email: user.email,
        tokenLength: user.verificationToken?.length || 0,
        tokenSample: user.verificationToken ? 
          user.verificationToken.substring(0, 10) + "..." + 
          user.verificationToken.substring(user.verificationToken.length - 10) : "null",
        expires: user.verificationTokenExpires,
        emailVerified: user.emailVerified
      })),
      totalUsersWithTokens: usersWithTokens.length
    });
    
  } catch (error) {
    console.error("DIAGNOSTIC ERROR:", error);
    return NextResponse.json({ 
      error: "Diagnostic failed", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    
    // Find user by email
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        verificationToken: true,
        verificationTokenExpires: true,
        emailVerified: true
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        verificationToken: user.verificationToken,
        verificationTokenExpires: user.verificationTokenExpires,
        emailVerified: user.emailVerified,
        tokenExists: !!user.verificationToken,
        tokenIsValid: user.verificationToken && 
          user.verificationTokenExpires && 
          new Date(user.verificationTokenExpires) > new Date()
      }
    });
    
  } catch (error) {
    console.error("DIAGNOSTIC ERROR:", error);
    return NextResponse.json({ 
      error: "Diagnostic failed", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
