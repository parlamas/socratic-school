// src/lib/prisma.server.ts

import "server-only";

// @ts-ignore PrismaClient is Node-only; safe in server context
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

