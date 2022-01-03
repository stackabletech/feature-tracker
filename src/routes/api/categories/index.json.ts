import { prisma } from "$lib/prisma";
import type { Category } from "@prisma/client";

// GET /categories.json
export const get = async ({}) => {
    const body = await prisma.category.findMany();
    return { body }
};

// POST /categories.json
export const post = async ({ body: data }: { body: Category }) => {
    const body = await prisma.category.create({ data });
    return { body }
}