// src/app/api/auth/reset-password/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Missing token or password" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired reset token" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return NextResponse.json({ ok: true });
}
