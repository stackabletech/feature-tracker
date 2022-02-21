import { prisma } from "$lib/prisma";

// GET /categories/:id.json
export const get = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.category.findUnique({
        where: { id }
    })
    return { body }
}

// PATCH /categories/:id.json
export const patch = async ({ params, request }) => {
    const data = await request.json()
    const id = parseInt(params.id);
    const body = await prisma.category.update({
        where: { id },
        data
    })
    return { body }
}

// DELETE /categories/:id.json
export const del = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.category.delete({
        where: { id }
    })
    return { body }
}
