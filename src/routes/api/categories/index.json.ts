import { prisma } from "$lib/prisma";
// import type { Category } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /categories.json
export const get = async ({}) => {
    const body = await prisma.category.findMany();
    return { body }
};

// POST /categories.json
export const post = async ({ body: data }: { body: any }) => {
    const body = await prisma.category.create({ data });
    return { body }
}