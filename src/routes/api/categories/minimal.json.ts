import { prisma } from "$lib/prisma";

// GET /categories/minimal.json
export const GET = async ({}) => {
    try {
        const body = await prisma.category.findMany({select: { id: true, name: true }});
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
};