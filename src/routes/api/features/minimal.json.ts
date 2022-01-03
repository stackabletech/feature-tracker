import { prisma } from "$lib/prisma";

// GET /features/ids.json
export const get = async ({}) => {
    const body = await prisma.feature.findMany({select: { id: true, name: true }});
    return { body }
};