// src/app/api/debug/users/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma.server'

export async function GET() {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        verificationToken: true,
        verificationTokenExpires: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      success: true,
      userCount: allUsers.length,
      users: allUsers,
      environment: process.env.NODE_ENV,
      hasVerificationTokenField: allUsers.length > 0 ? 
        'verificationToken' in allUsers[0] : 'no users',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}