import { prisma } from "$lib/prisma";

// GET /categories/minimal.json
export const get = async ({}) => {
    const body = await prisma.category.findMany({select: { id: true, name: true }});
    return { body }
};