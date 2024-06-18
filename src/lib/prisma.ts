// According to docs. Does not work:

// import { PrismaClient } from '@prisma/client'
// declare global { var prisma: PrismaClient | undefined}
// export const prisma = global.prisma || new PrismaClient()

// ----------------------------------------------------------------------------

import Prisma, * as PrismaAll from '@prisma/client';
const pc = Prisma?.PrismaClient || PrismaAll?.PrismaClient;
export const prisma = new pc();

// ----------------------------------------------------------------------------

// import { dev } from '$app/env'

// import Prisma from '@prisma/client'
// import type { PrismaClient } from '@prisma/client'
// export let prisma: PrismaClient

// if (dev) {
//     prisma = new Prisma.PrismaClient();
// } else {
//     console.log('not dev')
//     import('@prisma/client').then(( Prisma ) => {
//         prisma = new Prisma.PrismaClient();
//     });
// }

import type {
  Category,
  Feature,
  Product,
  ProductFeature,
  ImplementationStatus,
  Release
} from '@prisma/client';

export type { Category, Feature, Product, ProductFeature, ImplementationStatus, Release };
