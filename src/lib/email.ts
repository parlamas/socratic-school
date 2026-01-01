// src/lib/email.ts

import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Helper function to get the correct base URL for emails
function getBaseUrl() {
  // If NEXTAUTH_URL is set, use it (should be your production URL in production)
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // For Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // For Vercel preview deployments
  if (process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }
  
  // For Netlify deployments
  if (process.env.NETLIFY) {
    return process.env.URL || `https://${process.env.SITE_NAME}.netlify.app`;
  }
  
  // For Railway deployments
  if (process.env.RAILWAY_STATIC_URL) {
    return `https://${process.env.RAILWAY_STATIC_URL}`;
  }
  
  // For Render deployments
  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL;
  }
  
  // For Fly.io deployments
  if (process.env.FLY_APP_NAME) {
    return `https://${process.env.FLY_APP_NAME}.fly.dev`;
  }
  
  // Check if we're in production but no URL is set (last resort)
  if (process.env.NODE_ENV === 'production') {
    console.warn("⚠️ NEXTAUTH_URL is not set in production! Emails will have localhost links.");
    // You might want to hardcode your domain here temporarily:
    // return 'https://your-actual-domain.com';
  }
  
  // Default to localhost for development
  return 'http://localhost:3000';
}

// Log SMTP configuration (masked for security)
console.log("SMTP Config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER ? "***" : "MISSING",
  from: process.env.MAIL_FROM,
  baseUrl: getBaseUrl(),
  nodeEnv: process.env.NODE_ENV,
});

// Create transporter with better error handling
let transporter: Transporter | undefined;
try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === "465", // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  });

  // Test connection
  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP Connection Error:", error);
    } else {
      console.log("SMTP Server is ready to send emails");
    }
  });
} catch (error) {
  console.error("Failed to create SMTP transporter:", error);
}

// Helper function to get transporter
function getTransporter(): Transporter {
  if (!transporter) {
    throw new Error("SMTP transporter not initialized");
  }
  return transporter;
}

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  try {
    const baseUrl = getBaseUrl();
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;
    
    console.log("=== Sending Verification Email ===");
    console.log("To:", email);
    console.log("Base URL:", baseUrl);
    console.log("Full Verification URL:", verificationUrl);
    console.log("Environment:", process.env.NODE_ENV);

    const mailOptions = {
      from: process.env.MAIL_FROM || '"Socratic School" <noreply@socratic-school.com>',
      to: email,
      subject: "Verify your email - Socratic School",
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
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="color: #6b7280; font-size: 12px;">
            If you didn't create an account with Socratic School, you can safely ignore this email.
          </p>
        </div>
      `,
      text: `Welcome to Socratic School!\n\nPlease verify your email by visiting: ${verificationUrl}\n\nThis link expires in 24 hours.\n\nIf you didn't create an account, you can ignore this email.`,
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log("✅ Verification email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send verification email:", error);
    console.error("Error details:", {
      email: email,
      tokenLength: token?.length,
      baseUrl: getBaseUrl(),
      nodeEnv: process.env.NODE_ENV,
      smtpHost: process.env.SMTP_HOST,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    throw new Error(`Failed to send verification email: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    const baseUrl = getBaseUrl();
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;
    
    console.log("=== Sending Password Reset Email ===");
    console.log("To:", email);
    console.log("Base URL:", baseUrl);
    console.log("Full Reset URL:", resetUrl);
    console.log("Environment:", process.env.NODE_ENV);

    const mailOptions = {
      from: process.env.MAIL_FROM || '"Socratic School" <noreply@socratic-school.com>',
      to: email,
      subject: "Reset Your Password - Socratic School",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666; font-size: 14px;">
            ${resetUrl}
          </p>
          <p>This link expires in 1 hour.</p>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p style="color: #6b7280; font-size: 12px;">
            If you didn't request this password reset, please contact support immediately.
          </p>
        </div>
      `,
      text: `Password Reset Request\n\nClick here to reset your password: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.`,
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log("✅ Password reset email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send password reset email:", error);
    console.error("Error details:", {
      email: email,
      tokenLength: token?.length,
      baseUrl: getBaseUrl(),
      nodeEnv: process.env.NODE_ENV,
      smtpHost: process.env.SMTP_HOST,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    throw new Error(`Failed to send password reset email: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// Optional: Add email for other purposes
export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const baseUrl = getBaseUrl();
    
    console.log("=== Sending Welcome Email ===");
    console.log("To:", email);
    console.log("Base URL:", baseUrl);

    const mailOptions = {
      from: process.env.MAIL_FROM || '"Socratic School" <noreply@socratic-school.com>',
      to: email,
      subject: "Welcome to Socratic School!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome aboard, ${name}!</h2>
          <p>We're excited to have you join Socratic School. Your account has been successfully verified and you're ready to start learning.</p>
          <div style="margin: 30px 0;">
            <a href="${baseUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: bold;">
              Start Learning Now
            </a>
          </div>
          <p>Here's what you can do next:</p>
          <ul style="color: #4b5563;">
            <li>Explore available courses</li>
            <li>Complete your profile</li>
            <li>Join discussion forums</li>
            <li>Set up your learning goals</li>
          </ul>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="color: #6b7280; font-size: 12px;">
            Need help? Contact our support team at support@socratic-school.com
          </p>
        </div>
      `,
      text: `Welcome to Socratic School, ${name}!\n\nYour account is ready. Visit ${baseUrl} to start learning.\n\nNeed help? Contact support@socratic-school.com`,
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log("✅ Welcome email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}