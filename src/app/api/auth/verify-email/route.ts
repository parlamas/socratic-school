// src/app/api/auth/verify-email/route.ts - CORRECTED

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma.server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    console.log('=== Email Verification Started ===')
    console.log('Token received:', token)
    
    if (!token) {
      console.log('No token provided')
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'https://www.socratic-school.com'}/?error=No+token+provided`
      )
    }

    // Find user by verificationToken (stored on User model)
    const user = await prisma.user.findFirst({
      where: { 
        verificationToken: token,
        verificationTokenExpires: {
          gt: new Date() // Token not expired
        }
      },
    })

    console.log('User found:', !!user)
    if (user) {
      console.log('User email:', user.email)
      console.log('User role:', user.role)
      console.log('Token expires:', user.verificationTokenExpires)
    }

    if (!user) {
      // Check if token exists but is expired
      const expiredUser = await prisma.user.findFirst({
        where: { 
          verificationToken: token,
          verificationTokenExpires: {
            lte: new Date() // Token is expired
          }
        },
      })
      
      if (expiredUser) {
        console.log('Token expired for user:', expiredUser.email)
        // Clear expired token
        await prisma.user.update({
          where: { id: expiredUser.id },
          data: { 
            verificationToken: null,
            verificationTokenExpires: null
          }
        })
        // Redirect based on role
        let redirectPath = '/'
        if (expiredUser.role === 'instructor') {
          redirectPath = '/instructor/sign-in'
        } else if (expiredUser.role === 'student') {
          redirectPath = '/students/sign-in'
        }
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL || 'https://www.socratic-school.com'}${redirectPath}?error=Token+expired`
        )
      }
      
      console.log('Invalid token - no user found')
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'https://www.socratic-school.com'}/?error=Invalid+token`
      )
    }

    // Update user: verify email and clear tokens
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpires: null
      },
    })

    console.log('Email verified successfully for:', user.email)

    // Redirect to appropriate sign-in page based on role - FIXED!
    let redirectPath = '/'
    if (user.role === 'instructor') {
      redirectPath = '/instructor/sign-in'
    } else if (user.role === 'student') {
      redirectPath = '/students/sign-in'
    }

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'https://www.socratic-school.com'}${redirectPath}?verified=true`
    )
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'https://www.socratic-school.com'}/?error=Verification+failed`
    )
  }
}