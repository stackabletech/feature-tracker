import pkg, { PrismaClient } from "@prisma/client";
import { dev } from '$app/env';

export const prisma: PrismaClient = dev ? new PrismaClient() : new pkg.PrismaClient();