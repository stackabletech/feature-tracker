import { prisma } from "$lib/prisma";
// import type { ProductFeature } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /product_features.json
export const get = async ({}) => {
    try {
        const body = await prisma.productFeature.findMany();
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
};

// POST /product_features.json
export const post = async ({ request }) => {
    const data = await request.json()
    console.log(data);
    
    try {
        const body = await prisma.productFeature.create({ data });
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
}