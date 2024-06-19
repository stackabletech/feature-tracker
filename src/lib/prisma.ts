import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

import type {
  Category,
  Feature,
  Product,
  ProductFeature,
  ImplementationStatus,
  Release
} from '@prisma/client';

export type { Category, Feature, Product, ProductFeature, ImplementationStatus, Release };
