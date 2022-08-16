import { prisma } from "$lib/prisma";
// import type { Feature } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /features.json
export const GET = async ({}) => {
    try {
        const body = await prisma.feature.findMany({
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

// POST /features.json
export const POST = async ({ request }) => {
    const data = await request.json()
    data.category_id = data.category_id || null
    
    try {
        const body = await prisma.feature.create({ data });
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
}