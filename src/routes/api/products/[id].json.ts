import { prisma } from "$lib/prisma";

// GET /products/:id.json
export const get = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.product.findUnique({
        where: { id }
    })
    return { body }
}

// PATCH /products/:id.json
export const patch = async ({ params, body: data }) => {
    const id = parseInt(params.id);
    const body = await prisma.product.update({
        where: { id },
        data
    })
    return { body }
}

// DELETE /products/:id.json
export const del = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.product.delete({
        where: { id }
    })
    return { body }
}
