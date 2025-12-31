// test-verification.js

const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function testVerificationFlow() {
  console.log('🔍 VERIFICATION FLOW TEST =================\n');
  
  try {
    // 1. Create a test user
    console.log('1. Creating test user...');
    const testEmail = `test${Date.now()}@example.com`;
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        password: 'hashed_password_would_be_here',
        firstName: 'Test',
        lastName: 'User',
        username: `testuser${Date.now()}`,
        nationality: 'US',
        age: 25,
        role: 'student',
        verificationToken: verificationToken,
        verificationTokenExpires: verificationTokenExpires,
        emailVerified: null
      }
    });
    
    console.log('   ✅ User created:', user.email);
    console.log('   Token saved:', user.verificationToken.substring(0, 20) + '...');
    console.log('   Token length:', user.verificationToken.length);
    console.log('   Expires:', user.verificationTokenExpires);
    console.log('   Verified:', user.emailVerified);
    
    // 2. Simulate what verify-email route does
    console.log('\n2. Testing verification logic...');
    
    // Test with exact token
    const foundUser = await prisma.user.findFirst({
      where: {
        verificationToken: verificationToken,
        verificationTokenExpires: {
          gt: new Date()
        }
      }
    });
    
    console.log('   Found user with token:', !!foundUser);
    console.log('   User email:', foundUser?.email);
    console.log('   Token match:', foundUser?.verificationToken === verificationToken);
    
    if (!foundUser) {
      // Check if token exists but expired
      const expiredUser = await prisma.user.findFirst({
        where: {
          verificationToken: verificationToken
        }
      });
      
      console.log('   ❌ Token not found. Checking if expired...');
      console.log('   User exists with token:', !!expiredUser);
      if (expiredUser) {
        console.log('   Token expires at:', expiredUser.verificationTokenExpires);
        console.log('   Current time:', new Date());
        console.log('   Is expired?', expiredUser.verificationTokenExpires < new Date());
      }
    } else {
      // 3. Test updating user
      console.log('\n3. Testing user update (verification)...');
      
      await prisma.user.update({
        where: { id: foundUser.id },
        data: {
          emailVerified: new Date(),
          verificationToken: null,
          verificationTokenExpires: null
        }
      });
      
      console.log('   ✅ User marked as verified');
      
      // 4. Verify update worked
      const verifiedUser = await prisma.user.findUnique({
        where: { id: foundUser.id }
      });
      
      console.log('   Verified at:', verifiedUser.emailVerified);
      console.log('   Token cleared:', !verifiedUser.verificationToken);
      console.log('   Expiry cleared:', !verifiedUser.verificationTokenExpires);
    }
    
    // 5. Test URL encoding issues
    console.log('\n4. Testing URL encoding scenarios...');
    
    const urlEncodedToken = encodeURIComponent(verificationToken);
    const decodedToken = decodeURIComponent(urlEncodedToken);
    
    console.log('   Original token:', verificationToken.substring(0, 20) + '...');
    console.log('   URL encoded:', urlEncodedToken.substring(0, 30) + '...');
    console.log('   URL decoded:', decodedToken.substring(0, 20) + '...');
    console.log('   Match after encode/decode:', decodedToken === verificationToken);
    
    // Check for + character issues (common in URLs)
    if (verificationToken.includes('+')) {
      console.log('   ⚠️ Token contains + character - this might cause URL issues');
      const tokenWithPlusFixed = verificationToken.replace(/\+/g, ' ');
      console.log('   With + replaced by space:', tokenWithPlusFixed.substring(0, 20) + '...');
      
      // Test if this token exists
      const plusFixedUser = await prisma.user.findFirst({
        where: {
          verificationToken: tokenWithPlusFixed
        }
      });
      console.log('   Found with + replaced:', !!plusFixedUser);
    }
    
    // 6. Check database directly
    console.log('\n5. Checking all users in database...');
    const allUsers = await prisma.user.findMany({
      select: {
        email: true,
        verificationToken: true,
        verificationTokenExpires: true,
        emailVerified: true
      }
    });
    
    console.log(`   Total users: ${allUsers.length}`);
    allUsers.forEach((u, i) => {
      console.log(`   [${i+1}] ${u.email}:`);
      console.log(`       Token: ${u.verificationToken ? u.verificationToken.substring(0, 20) + '...' : 'NULL'}`);
      console.log(`       Verified: ${u.emailVerified}`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
    console.log('\n✅ Test completed');
  }
}

// Run the test
testVerificationFlow();