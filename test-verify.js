// api/test-verify.js (temporary test route)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  
  const { token } = req.query;
  
  console.log('=== VERIFICATION DEBUG ===');
  console.log('Token received:', token);
  console.log('Token length:', token?.length);
  console.log('Token type:', typeof token);
  console.log('Raw URL:', req.url);
  console.log('Query params:', req.query);
  
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }
  
  try {
    // Decode URL encoding
    const decodedToken = decodeURIComponent(token);
    console.log('Decoded token:', decodedToken);
    console.log('Decoded length:', decodedToken.length);
    
    // Try exact match
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: decodedToken,
        verificationTokenExpires: { gt: new Date() }
      }
    });
    
    console.log('User found with exact match:', !!user);
    
    if (!user) {
      // Check if token exists but expired
      const expiredUser = await prisma.user.findFirst({
        where: {
          verificationToken: decodedToken
        }
      });
      
      console.log('User found with token (any expiry):', !!expiredUser);
      if (expiredUser) {
        console.log('Token expiry:', expiredUser.verificationTokenExpires);
        console.log('Current time:', new Date());
        console.log('Is expired?', expiredUser.verificationTokenExpires < new Date());
      }
      
      // Check for + character issue
      if (decodedToken.includes('+')) {
        const tokenWithSpaces = decodedToken.replace(/\+/g, ' ');
        console.log('Trying with + replaced by space:', tokenWithSpaces);
        
        const userWithFixedToken = await prisma.user.findFirst({
          where: {
            verificationToken: tokenWithSpaces,
            verificationTokenExpires: { gt: new Date() }
          }
        });
        
        console.log('User found with + fixed:', !!userWithFixedToken);
        if (userWithFixedToken) {
          return res.json({ 
            success: true, 
            message: 'Found with + fix',
            email: userWithFixedToken.email 
          });
        }
      }
      
      return res.status(400).json({ 
        error: 'Invalid or expired verification token',
        debug: {
          tokenLength: token.length,
          decodedLength: decodedToken.length,
          userExists: !!expiredUser,
          isExpired: expiredUser ? expiredUser.verificationTokenExpires < new Date() : null
        }
      });
    }
    
    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpires: null
      }
    });
    
    res.json({ 
      success: true, 
      message: 'Email verified successfully',
      email: user.email 
    });
    
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}