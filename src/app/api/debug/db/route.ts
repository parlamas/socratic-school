// src/app/api/debug/db/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma.server'

export async function GET() {
  try {
    // Test DB connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    // Count users with verification tokens (NOT verificationToken model)
    const usersWithTokens = await prisma.user.count({
      where: {
        verificationToken: {
          not: null
        }
      }
    })
    
    // Count all users
    const totalUsers = await prisma.user.count()
    
    // Get a sample of users with tokens (for debugging)
    const sampleUsers = await prisma.user.findMany({
      where: {
        verificationToken: {
          not: null
        }
      },
      select: {
        email: true,
        verificationToken: true,
        verificationTokenExpires: true,
        emailVerified: true
      },
      take: 5
    })
    
    return NextResponse.json({
      dbConnected: true,
      testQuery: result,
      usersWithVerificationTokens: usersWithTokens,
      totalUsers: totalUsers,
      sampleUsers: sampleUsers,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      dbConnected: false,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}