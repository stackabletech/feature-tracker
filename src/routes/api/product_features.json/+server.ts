import { json } from '@sveltejs/kit';
import { prisma } from "$lib/prisma";
// import type { ProductFeature } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /product_features.json
export const GET = async ({}) => {
    try {
        const body = await prisma.productFeature.findMany();
        return json(body);
    } catch ({ code, message }) {
        return json({ code, message }, {
            status: 500
        })
    }
};

// POST /product_features.json
export const POST = async ({ request }) => {
    const data = await request.json()
    try {
        const body = await prisma.productFeature.create({ data });
        return json(body);
    } catch ({ code, message }) {
        return json({ code, message }, {
            status: 500
        })
    }
}