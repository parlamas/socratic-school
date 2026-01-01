// src/app/api/debug/log-test/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  console.log("=== LOG TEST START ===");
  console.log("Timestamp:", new Date().toISOString());
  console.log("Test message: This should appear in logs");
  console.log("Environment:", process.env.NODE_ENV);
  console.log("=== LOG TEST END ===");
  
  return NextResponse.json({
    success: true,
    message: "Check logs for 'LOG TEST' messages",
    timestamp: new Date().toISOString()
  });
}
