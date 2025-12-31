// src/lib/email.ts

import "server-only";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // required for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const url = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Verify your email",
    html: `
      <p>Welcome to Socratic School.</p>
      <p>Please verify your email by clicking the link below:</p>
      <p><a href="${url}">Verify email</a></p>
      <p>This link expires in 24 hours.</p>
    `,
  });
}
