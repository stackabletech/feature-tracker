import { prisma } from "$lib/prisma";

// GET /products/minimal.json
export const get = async ({}) => {
    const body = await prisma.product.findMany({select: { id: true, name: true }});
    return { body }
};