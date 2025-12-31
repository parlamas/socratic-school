// src/app/api/auth/forgot-password/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // For security, don't reveal if user exists
      return NextResponse.json({ 
        success: true,
        message: "If an account exists with this email, reset instructions will be sent."
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });

    // Send reset email
    try {
      await sendPasswordResetEmail(email, token);
      console.log(`Password reset email sent to: ${email}`);
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError);
      // Still log the link for development
      console.log(
        `Reset link: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "If an account exists with this email, reset instructions will be sent."
    });
    
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}