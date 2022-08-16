import { json } from '@sveltejs/kit';
import { prisma } from "$lib/prisma";
// import type { Product } from "@prisma/client";

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /products.json
export const GET = async ({params, request, url}) => {
    try {
        const body = await prisma.product.findMany({
            orderBy: { name: 'asc' }
        });
        return json(body);
    } catch ({ code, message }) {
        return json({ code, message }, {
            status: 500
        })
    }
};

// POST /products.json
export const POST = async ({ request }) => {
    const data = await request.json()
    try {
        const body = await prisma.product.create({ data });
        return json(body);
    } catch ({ code, message }) {
        return json({ code, message }, {
            status: 500
        })
    }
}