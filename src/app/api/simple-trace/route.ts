// src/app/api/simple-trace/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma.server'

export async function GET() {
  const testEmail = `simple${Date.now()}@test.com`
  const steps = []
  
  try {
    // Step 1: Generate token
    const token1 = crypto.randomBytes(32).toString('hex')
    steps.push(`1. Generated token: ${token1.substring(0, 10)}...`)
    
    // Step 2: Create user
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: await bcrypt.hash('Test123', 12),
        firstName: 'Simple',
        lastName: 'Test',
        username: `simple${Date.now()}`,
        nationality: 'Test',
        age: 25,
        role: 'student',
        verificationToken: token1,
        verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    })
    steps.push(`2. Created user: ${user.id}`)
    
    // Step 3: Verify save
    const saved = await prisma.user.findUnique({
      where: { id: user.id },
      select: { verificationToken: true }
    })
    steps.push(`3. Saved token: ${saved?.verificationToken?.substring(0, 10)}...`)
    steps.push(`4. Match? ${saved?.verificationToken === token1}`)
    
    // Step 4: Manually create verification link
    const manualLink = `https://www.socratic-school.com/api/auth/verify-email?token=${token1}`
    steps.push(`5. Manual link: ${manualLink}`)
    
    return NextResponse.json({
      success: true,
      steps: steps,
      test: {
        email: testEmail,
        token: token1,
        verificationLink: manualLink
      },
      note: 'Visit the verification link above directly'
    })
    
  } catch (error) {
    steps.push(`ERROR: ${error instanceof Error ? error.message : String(error)}`)
    return NextResponse.json({
      success: false,
      steps: steps,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
