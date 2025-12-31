// src/lib/auth.ts

import "server-only";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma.server";

// Define a custom user type with your fields
interface CustomUser extends User {
  role: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

// Extend the session and token types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      firstName?: string;
      lastName?: string;
      username?: string;
    };
  }
  
  interface User {
    role: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  session: {
    strategy: "jwt", // Use JWT strategy for credentials provider
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

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

        // Return user with custom fields
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        } as CustomUser;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in - add user info to token
      if (user) {
        const customUser = user as CustomUser;
        token.role = customUser.role;
        token.id = customUser.id;
        token.firstName = customUser.firstName;
        token.lastName = customUser.lastName;
        token.username = customUser.username;
        token.email = customUser.email;
        // Add a name property for NextAuth compatibility
        token.name = `${customUser.firstName || ''} ${customUser.lastName || ''}`.trim() || customUser.username || '';
      }
      return token;
    },

    async session({ session, token }) {
      // Add user info from token to session
      if (session.user && token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },

  pages: {
    // Remove the hardcoded signIn page since we have multiple
    // The middleware will handle redirects appropriately
  },
};