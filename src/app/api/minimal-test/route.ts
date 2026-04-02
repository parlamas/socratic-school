import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma.server";

export async function GET() {
  const testEmail = `minimal-${Date.now()}@test.com`;
  const token = crypto.randomBytes(24).toString("hex");
  
  console.log("MINIMAL TEST: Generated token (48 chars):", token);
  
  const user = await prisma.user.create({
    data: {
      email: testEmail,
      password: "minimal-test",
      firstName: "Minimal",
      lastName: "Test",
      username: `minimal${Date.now()}`,
      nationality: "Test",
      age: 30,
      role: "student",
      verificationToken: token,
      verificationTokenExpires: new Date(Date.now() + 3600000),
    },
  });
  
  console.log("MINIMAL TEST: User created, token saved?", !!user.verificationToken);
  
  const stored = await prisma.user.findUnique({
    where: { id: user.id },
    select: { verificationToken: true }
  });
  
  const match = stored?.verificationToken === token;
  
  await prisma.user.delete({ where: { id: user.id } });
  
  return NextResponse.json({
    success: match,
    generatedToken: token,
    storedToken: stored?.verificationToken,
    match: match,
    lengths: {
      generated: token.length,
      stored: stored?.verificationToken?.length
    },
    issue: !match ? "DATABASE TOKEN MISMATCH!" : "Works"
  });
}
