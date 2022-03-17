// Prisma (workaround until Prisma fully supports ESM)
// This works in DEV
import * as Prisma from '@prisma/client'
import { dev } from '$app/env'

// This works in PROD
import { default as ProdPrisma } from '@prisma/client'

let { PrismaClient } = Prisma

if (!dev) PrismaClient = ProdPrisma.PrismaClient
export const prisma = new PrismaClient()