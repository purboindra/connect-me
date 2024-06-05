// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Allow access to the global variable across the app
  // Prevent TypeScript from complaining about implicit 'any' type
  // Use 'var' to avoid TypeScript error 'Cannot redeclare block-scoped variable 'prisma''
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
