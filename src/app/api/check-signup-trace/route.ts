// src/app/api/test-signup-trace/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma.server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const emailToken = "7542f1fc0f2a0628cc006fa44f1dc0739fdd1ba9314bfd31d865cdd6d93a2d8c"
    const dbToken = "815cad330de658f080be..."  // We need the full DB token
    
    console.log('🔍 Testing token mismatch')
    console.log('Email token:', emailToken.substring(0, 20) + '...')
    
    // Get ALL users with tokens
    const users = await prisma.user.findMany({
      where: { verificationToken: { not: null } },
      select: {
        email: true,
        verificationToken: true,
        createdAt: true
      }
    })
    
    // Check if email token exists
    const userWithEmailToken = await prisma.user.findFirst({
      where: { verificationToken: emailToken },
      select: { email: true }
    })
    
    return NextResponse.json({
      emailTokenExists: !!userWithEmailToken,
      emailTokenPreview: emailToken.substring(0, 20) + '...',
      databaseTokensCount: users.length,
      databaseTokens: users.map(u => ({
        email: u.email,
        tokenPreview: u.verificationToken ? u.verificationToken.substring(0, 20) + '...' : null,
        fullToken: u.verificationToken,  // Include FULL token
        createdAt: u.createdAt
      }))
    })
    
  } catch (error) {
    console.error('Token test error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
