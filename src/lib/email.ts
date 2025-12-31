// src/lib/email.ts - REAL VERSION (REPLACE YOUR CURRENT FILE)

import "server-only";
import nodemailer from "nodemailer";

// Log configuration
console.log("📧 Loading REAL email service...");

// Create transporter
let transporter: any = null;

try {
  // Check if SMTP is configured
  const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
  
  if (!hasSmtpConfig) {
    console.error("❌ SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env");
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify connection
    transporter.verify((error: any, success: any) => {
      if (error) {
        console.error("❌ SMTP Connection Failed:", error.message);
      } else {
        console.log("✅ SMTP Connected - Ready to send emails");
      }
    });
  }
} catch (error) {
  console.error("❌ Failed to setup email transporter:", error);
}

/**
 * Sends a REAL verification email
 */
export async function sendVerificationEmail(email: string, token: string) {
  try {
    // Check if transporter exists
    if (!transporter) {
      throw new Error("Email service not configured. Check SMTP settings.");
    }

    // Check for required environment variables
    if (!process.env.NEXTAUTH_URL) {
      throw new Error("NEXTAUTH_URL is not set");
    }

    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
    
    console.log("📧 SENDING REAL VERIFICATION EMAIL TO:", email);
    console.log("🔗 Verification URL:", verificationUrl);

    const mailOptions = {
      from: process.env.MAIL_FROM || '"Socratic School" <noreply@socratic-school.com>',
      to: email,
      subject: "Verify Your Email - Socratic School",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Socratic School!</h2>
          <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
          <div style="margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666; font-size: 14px;">
            ${verificationUrl}
          </p>
          <p>This verification link will expire in 24 hours.</p>
          <hr style="margin: 30px 0;" />
          <p style="color: #6b7280; font-size: 12px;">
            If you didn't create an account, please ignore this email.
          </p>
        </div>
      `,
      text: `Welcome to Socratic School!\n\nPlease verify your email by visiting: ${verificationUrl}\n\nThis link expires in 24 hours.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email SENT successfully:", info.messageId);
    return info;
    
  } catch (error: any) {
    console.error("❌ FAILED to send verification email:", error.message);
    console.error("Error details:", {
      email,
      tokenLength: token?.length,
      hasTransporter: !!transporter,
      smtpHost: process.env.SMTP_HOST,
      error: error.message
    });
    throw error;
  }
}

/**
 * Password reset email
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    if (!transporter) {
      throw new Error("Email service not configured");
    }

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    
    console.log("📧 Sending password reset email to:", email);

    const mailOptions = {
      from: process.env.MAIL_FROM || '"Socratic School" <noreply@socratic-school.com>',
      to: email,
      subject: "Reset Your Password - Socratic School",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>Click the button below to reset your password:</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p>Or copy this link: ${resetUrl}</p>
          <p>This link expires in 1 hour.</p>
        </div>
      `,
      text: `Reset your password: ${resetUrl}\n\nThis link expires in 1 hour.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent:", info.messageId);
    return info;
    
  } catch (error: any) {
    console.error("❌ Failed to send password reset email:", error.message);
    throw error;
  }
}

/**
 * Check if email is properly configured
 */
export function isEmailConfigured(): boolean {
  return !!transporter;
}