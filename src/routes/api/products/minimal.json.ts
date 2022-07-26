import { prisma } from "$lib/prisma";

// GET /products/minimal.json
export const GET = async ({}) => {
    try {
        const body = await prisma.product.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        });
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
};