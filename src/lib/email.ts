// src/lib/email.ts

import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Log SMTP configuration (masked for security)
console.log("SMTP Config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER ? "***" : "MISSING",
  from: process.env.MAIL_FROM,
  nextauthUrl: process.env.NEXTAUTH_URL,
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

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  try {
    // Check if transporter was created
    if (!transporter) {
      throw new Error("SMTP transporter not initialized");
    }

    // Check required environment variables
    if (!process.env.NEXTAUTH_URL) {
      throw new Error("NEXTAUTH_URL is not set");
    }

    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
    
    console.log("Sending verification email to:", email);
    console.log("Verification URL:", verificationUrl);

    const mailOptions = {
      from: process.env.MAIL_FROM || '"Socratic School" <noreply@socratic-school.com>',
      to: email,
      subject: "Verify your email - Socratic School",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Socratic School!</h2>
          <p>Thank you for registering as a student. Please verify your email address by clicking the button below:</p>
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
      text: `Welcome to Socratic School!\n\nPlease verify your email by visiting: ${verificationUrl}\n\nThis link expires in 24 hours.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    console.error("Error details:", {
      email: email,
      tokenLength: token?.length,
      nextauthUrl: process.env.NEXTAUTH_URL,
      smtpHost: process.env.SMTP_HOST,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    throw new Error(`Failed to send verification email: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}