import { prisma } from "$lib/prisma";
// import type { Product } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /products.json
export const get = async ({params, request, url}) => {
    console.log(url.searchParams.get("foo"))
    const body = await prisma.product.findMany();
    return { body }
};

// POST /products.json
export const post = async ({ body: data }: { body: any }) => {
    const body = await prisma.product.create({ data });
    return { body }
}