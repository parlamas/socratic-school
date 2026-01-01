// src/app/api/log-test/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🔴🔴🔴 FORCED LOG TEST - Server is working! 🔴🔴🔴')
  console.log('Time:', new Date().toISOString())
  console.log('Environment:', process.env.NODE_ENV)
  console.log('URL:', process.env.NEXTAUTH_URL)
  
  return NextResponse.json({
    success: true,
    message: 'Log test completed',
    time: new Date().toISOString(),
    env: process.env.NODE_ENV
  })
}
