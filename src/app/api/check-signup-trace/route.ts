// src/app/api/test-signup-trace/route.ts

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma.server'

export async function GET() {
  try {
    const testEmail = `test${Date.now()}@example.com`
    
    console.log('🔍 TEST: Creating user with token')
    console.log('Email:', testEmail)
    
    // Generate token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    
    console.log('Token (first 10 chars):', verificationToken.substring(0, 10))
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: await bcrypt.hash('Test123!', 12),
        firstName: 'Test',
        lastName: 'User',
        username: `testuser${Date.now()}`,
        nationality: 'Test',
        age: 25,
        role: 'student',
        verificationToken,
        verificationTokenExpires,
      },
    })
    
    console.log('✅ User created. ID:', user.id)
    
    // Check what was actually saved
    const savedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        email: true,
        verificationToken: true,
        emailVerified: true,
        createdAt: true
      }
    })
    
    console.log('📊 Saved user data:')
    console.log('- Token saved?:', !!savedUser?.verificationToken)
    console.log('- Email verified?:', !!savedUser?.emailVerified)
    console.log('- Token matches?:', savedUser?.verificationToken === verificationToken)
    
    return NextResponse.json({
      success: true,
      message: 'Test user created',
      data: {
        id: user.id,
        email: user.email,
        tokenSaved: !!savedUser?.verificationToken,
        emailVerified: !!savedUser?.emailVerified,
        tokenPreview: savedUser?.verificationToken ? 
          savedUser.verificationToken.substring(0, 20) + '...' : 'NO TOKEN!',
        createdAt: savedUser?.createdAt
      }
    })
    
  } catch (err) {
    console.error('❌ Test failed:', err)
    
    let errorMessage = 'Unknown error'
    if (err instanceof Error) {
      errorMessage = err.message
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 })
  }
}