import { prisma } from "$lib/prisma";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /categories.json
export const GET = async ({}) => {
    try {
        const body = await prisma.category.findMany({
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

// POST /categories.json
export const POST = async ({ request }) => {
    const data = await request.json()
    data.parent_id = data.parent_id || null
    
    try {
        const body = await prisma.category.create({ data });
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
}