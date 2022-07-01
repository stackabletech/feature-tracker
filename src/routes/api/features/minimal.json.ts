import { prisma } from "$lib/prisma";

// GET /features/ids.json
export const get = async ({}) => {
    try {
        const body = await prisma.feature.findMany({select: { id: true, name: true }});
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
};