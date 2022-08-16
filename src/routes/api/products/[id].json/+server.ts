import { json } from '@sveltejs/kit';
import { prisma } from "$lib/prisma";

// GET /products/:id.json
export const GET = async ({ params }) => {
    const id = parseInt(params.id);

    try {
        const body = await prisma.product.findUnique({
            where: { id }
        })
        return json(body);
    } catch ({ code, message }) {
        return json({ code, message }, {
            status: 500
        })
    }
}

// PATCH /products/:id.json
export const PATCH = async ({ params, request }) => {
    const data = await request.json()
    const id = parseInt(params.id);

    try {
        const body = await prisma.product.update({
            where: { id },
            data
        })
        return json(body);
    } catch ({ code, message }) {
        return json({ code, message }, {
            status: 500
        })
    }
}

// DELETE /products/:id.json
export const DELETE = async ({ params }) => {
    const id = parseInt(params.id);

    try {
        const body = await prisma.product.delete({
            where: { id }
        })
        return json(body);
    } catch ({ code, message }) {
        return json({ code, message }, {
            status: 500
        })
    }
}
