// src/app/api/auth/verify-email/route.ts - COMPLETE FIX

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma.server'

export async function GET(request: NextRequest) {
  try {
    let token = request.nextUrl.searchParams.get('token');
    
    console.log("VERIFY: Received token parameter:", token?.substring(0, 50));
    
    if (!token) {
      return NextResponse.redirect('https://www.socratic-school.com/?error=No+token');
    }
    
    // FIX: Try multiple decoding strategies
    let foundUser = null;
    
    // Strategy 1: Try the token as-is (already URL decoded by Next.js)
    foundUser = await prisma.user.findFirst({
      where: { verificationToken: token }
    });
    
    if (!foundUser) {
      console.log("Strategy 1 failed, trying decodeURIComponent...");
      // Strategy 2: Try decoding (in case it's double-encoded)
      try {
        const decodedToken = decodeURIComponent(token);
        foundUser = await prisma.user.findFirst({
          where: { verificationToken: decodedToken }
        });
      } catch (e) {
        console.log("decodeURIComponent failed, token might not be encoded");
      }
    }
    
    if (!foundUser) {
      console.log("Strategy 2 failed, trying to replace + with space...");
      // Strategy 3: Handle + sign issue (common in email clients)
      const tokenWithSpaces = token.replace(/\+/g, ' ');
      foundUser = await prisma.user.findFirst({
        where: { verificationToken: tokenWithSpaces }
      });
    }
    
    if (!foundUser) {
      console.log("Strategy 3 failed, trying exact match with all users...");
      
      // Get all users with tokens for debugging
      const allUsers = await prisma.user.findMany({
        where: { verificationToken: { not: null } },
        select: { email: true, verificationToken: true }
      });
      
      console.log("All users with tokens:", allUsers.map(u => ({
        email: u.email,
        tokenLength: u.verificationToken?.length,
        tokenStart: u.verificationToken?.substring(0, 20)
      })));
      
      // Strategy 4: Try to find any user where token partially matches
      for (const user of allUsers) {
        if (user.verificationToken && token.includes(user.verificationToken.substring(0, 20))) {
          console.log("Found partial match!");
          foundUser = { id: (user as any).id, email: user.email, verificationToken: user.verificationToken };
          break;
        }
      }
    }
    
    if (!foundUser) {
      console.log("ALL STRATEGIES FAILED - Token not found");
      return NextResponse.redirect('https://www.socratic-school.com/?error=Invalid+token&received=' + encodeURIComponent(token.substring(0, 50)));
    }
    
    console.log("VERIFY: Found user:", foundUser.email);
    
    // Update user
    await prisma.user.update({
      where: { id: (foundUser as any).id },
      data: { 
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpires: null
      }
    });
    
    console.log("VERIFY: User verified successfully");
    
    return NextResponse.redirect('https://www.socratic-school.com/students/sign-in?verified=true');
    
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return NextResponse.redirect('https://www.socratic-school.com/?error=Verification+failed');
  }
}