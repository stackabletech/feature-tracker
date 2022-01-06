import { prisma } from "$lib/prisma";
// import type { ProductFeature } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /product_features.json
export const get = async ({}) => {
    const body = await prisma.productFeature.findMany();
    return { body }
};

// POST /product_features.json
export const post = async ({ body: data }: { body: any }) => {
    const body = await prisma.productFeature.create({ data });
    return { body }
}