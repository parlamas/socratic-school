// src/lib/prisma.server.ts

import "server-only";

// @ts-expect-error PrismaClient is Node-only; runtime is correct under App Router + bundler
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
