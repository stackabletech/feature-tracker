import { prisma } from "$lib/prisma";
import type { Feature } from "@prisma/client";

// GET /features.json
export const get = async ({}) => {
    const body = await prisma.feature.findMany();
    return { body }
};

// POST /features.json
export const post = async ({ body: data }: { body: Feature }) => {
    const body = await prisma.feature.create({ data });
    return { body }
}