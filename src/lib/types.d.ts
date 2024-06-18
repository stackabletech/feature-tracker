import type { ImplementationStatus, Category, Product, Feature } from '$lib/prisma';

export interface Locals {
  userid: string;
}

// We know every DB Objects includes an 'id' field that can be used to update it via '/api/[DBObject]/[id].json', regardless of the specific object type.
export interface DBObject {
  id: number;
  [key?: string]: any;
}

export type DBField = string | Date | number | Category | Product | Feature | ImplementationStatus;
