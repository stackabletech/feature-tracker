import { prisma } from "$lib/prisma";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /categories.json
export const get = async ({}) => {
    const body = await prisma.category.findMany();
    return { body }
};

// POST /categories.json
export const post = async ({ request }) => {
    const data = await request.json()
    data.parent_id = data.parent_id || null
    const body = await prisma.category.create({ data });
    return { body }
}