// src/app/api/debug/capture-data/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.server";

export async function POST(req: Request) {
  try {
    // Capture the exact incoming data
    const body = await req.json();
    
    console.log("=== CAPTURED SIGNUP DATA ===");
    console.log("Full request body:", JSON.stringify(body, null, 2));
    console.log("Email:", body.email);
    console.log("Username:", body.username);
    console.log("First name:", body.firstName);
    console.log("Last name:", body.lastName);
    console.log("Nationality:", body.nationality);
    console.log("Age:", body.age);
    console.log("Password length:", body.password?.length);
    console.log("=== END CAPTURED DATA ===");
    
    // Try to create with this exact data
    const token = "capture-test-token";
    
    const user = await prisma.user.create({
      data: {
        email: body.email || `test-${Date.now()}@test.com`,
        password: "hashed-placeholder",
        firstName: body.firstName || "Test",
        lastName: body.lastName || "User",
        username: body.username || `testuser${Date.now()}`,
        nationality: body.nationality || "Test",
        age: body.age ? Number(body.age) : 25,
        role: "student",
        verificationToken: token,
        verificationTokenExpires: new Date(Date.now() + 3600000),
      },
    });
    
    // Clean up
    await prisma.user.delete({ where: { id: user.id } });
    
    return NextResponse.json({
      success: true,
      message: "Data captured and test passed",
      capturedData: body
    });
    
  } catch (error: any) {
    console.error("CAPTURE TEST ERROR:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      meta: error.meta,
      capturedData: await req.json().catch(() => ({}))
    }, { status: 500 });
  }
}
