//src/lib/auth.ts

import "server-only";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.server";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const identifier = credentials.email;

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: identifier }, { username: identifier }],
          },
        });

        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        } as any;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        (token as any).role = (user as any).role;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/students/sign-in",
  },
};
