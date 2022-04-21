import { prisma } from "$lib/prisma";
// import type { Feature } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /features.json
export const get = async ({}) => {
    const body = await prisma.feature.findMany();
    return { body }
};

// POST /features.json
export const post = async ({ request }) => {
    const data = await request.json()
    data.category_id = data.category_id || null
    const body = await prisma.feature.create({ data });
    return { body }
}