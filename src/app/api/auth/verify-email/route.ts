// src/app/api/auth/verify-email/route.ts - UPDATED
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    console.log("🔍 Verification attempt:", {
      token: token?.substring(0, 20) + "...",
      tokenLength: token?.length,
      url: req.url
    });

    if (!token) {
      console.log("❌ No token provided");
      return NextResponse.json(
        { error: "Missing verification token" },
        { status: 400 }
      );
    }

    // Try URL decoding
    const decodedToken = decodeURIComponent(token);
    console.log("🔍 Decoded token:", decodedToken?.substring(0, 20) + "...");

    // Find user with this token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: decodedToken, // Use decoded token
        verificationTokenExpires: {
          gt: new Date(),
        },
      },
    });

    console.log("🔍 Database query result:", {
      foundUser: !!user,
      userEmail: user?.email,
      userTokenInDB: user?.verificationToken?.substring(0, 20) + "...",
      tokenExpires: user?.verificationTokenExpires,
      currentTime: new Date()
    });

    if (!user) {
      // Check if token exists but expired
      const expiredUser = await prisma.user.findFirst({
        where: {
          verificationToken: decodedToken,
        },
      });
      
      console.log("❌ Token not found or invalid", {
        tokenExists: !!expiredUser,
        isExpired: expiredUser?.verificationTokenExpires 
          ? expiredUser.verificationTokenExpires < new Date() 
          : 'no expiry'
      });
      
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Update user to mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpires: null,
      },
    });

    console.log("✅ Email verified successfully for:", user.email);

    // Redirect to sign-in page with success message
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/students/sign-in?verified=true`);
    
  } catch (err) {
    console.error("❌ Email verification error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}