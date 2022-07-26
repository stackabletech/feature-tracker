import { prisma } from "$lib/prisma";

// GET /products/:id.json
export const GET = async ({ params }) => {
    const id = parseInt(params.id);

    try {
        const body = await prisma.product.findUnique({
            where: { id }
        })
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
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
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
}

// DELETE /products/:id.json
export const DELETE = async ({ params }) => {
    const id = parseInt(params.id);

    try {
        const body = await prisma.product.delete({
            where: { id }
        })
        return { body }
    } catch ({ code, message }) {
        return {
            status: 500,
            body: { code, message }
        }
    }
}
