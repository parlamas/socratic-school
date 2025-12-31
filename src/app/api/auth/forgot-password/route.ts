// src/app/api/auth/forgot-password/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpires: expires,
    },
  });

  // TODO: send email (for now log)
  console.log(
    `Reset link: http://localhost:3000/reset-password?token=${token}`
  );

  return NextResponse.json({ ok: true });
}
