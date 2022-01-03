import { prisma } from "$lib/prisma";
import type { ProductFeature } from "@prisma/client";

// GET /product_features.json
export const get = async ({}) => {
    const body = await prisma.productFeature.findMany();
    return { body }
};

// POST /product_features.json
export const post = async ({ body: data }: { body: ProductFeature }) => {
    const body = await prisma.productFeature.create({ data });
    return { body }
}