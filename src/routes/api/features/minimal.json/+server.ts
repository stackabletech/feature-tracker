import { prisma } from "$lib/prisma";

// GET /features/ids.json
export const GET = async ({}) => {
    try {
        const body = await prisma.feature.findMany({
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