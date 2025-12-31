// src/lib/email.ts - UPDATED FOR AUTO-VERIFICATION
import "server-only";

/**
 * SIMPLIFIED EMAIL SERVICE
 * Since sign-up now auto-verifies users, we don't need to send verification emails.
 * These functions are kept for future use or password reset functionality.
 */

// Log that email service is loaded (but simplified)
console.log("📧 Email service loaded (simplified mode - auto-verification enabled)");

/**
 * Logs that a verification email would be sent (for debugging)
 * In your current setup, users are auto-verified, so no emails are sent.
 */
export async function sendVerificationEmail(
  email: string,
  token: string
) {
  console.log("📧 [SIMULATED] Verification email would be sent to:", email);
  console.log("📧 [SIMULATED] Verification token:", token.substring(0, 10) + "...");
  console.log("📧 [INFO] User is auto-verified - no email actually sent");
  
  // Return simulated success for compatibility
  return { 
    messageId: 'simulated-' + Date.now(),
    accepted: [email],
    rejected: []
  };
}

/**
 * Password reset email function (can be used if needed)
 * You can enable this later by adding nodemailer back
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  console.log("📧 [SIMULATED] Password reset email would be sent to:", email);
  console.log("📧 [SIMPLIFIED] In production, implement nodemailer here");
  
  // Return simulated success for compatibility
  return { 
    messageId: 'simulated-reset-' + Date.now(),
    accepted: [email],
    rejected: []
  };
}

/**
 * General email function for future use
 */
export async function sendEmail(to: string, subject: string, html: string, text?: string) {
  console.log("📧 [SIMULATED] Email would be sent:");
  console.log("   To:", to);
  console.log("   Subject:", subject);
  console.log("   Preview:", html.substring(0, 100) + "...");
  
  return { 
    messageId: 'simulated-email-' + Date.now(),
    accepted: [to],
    rejected: []
  };
}

/**
 * Check if email service is properly configured
 */
export function isEmailConfigured(): boolean {
  // For now, return true since we're using auto-verification
  // Later, check if SMTP credentials exist for real emails
  const hasSmtpConfig = !!process.env.SMTP_HOST && !!process.env.SMTP_USER;
  console.log("📧 Email configuration check:", hasSmtpConfig ? "Configured" : "Using auto-verification");
  return hasSmtpConfig;
}