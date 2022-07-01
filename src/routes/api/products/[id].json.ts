import { prisma } from "$lib/prisma";

// GET /products/:id.json
export const get = async ({ params }) => {
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
export const patch = async ({ params, request }) => {
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
export const del = async ({ params }) => {
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
