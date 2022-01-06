import Prisma, * as PrismaAll from '@prisma/client'

const pc = Prisma?.PrismaClient || PrismaAll.PrismaClient
export const prisma = new pc()