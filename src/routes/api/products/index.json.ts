import { prisma } from "$lib/prisma";
import type { Product } from "@prisma/client";

// GET /products.json
export const get = async ({}) => {
    const body = await prisma.product.findMany();
    return { body }
};

// POST /products.json
export const post = async ({ body: data }: { body: Product }) => {
    const body = await prisma.product.create({ data });
    return { body }
}