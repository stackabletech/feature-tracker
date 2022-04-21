import { prisma } from "$lib/prisma";

// GET /features/:id.json
export const get = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.feature.findUnique({
        where: { id }
    })
    return { body }
}

// PATCH /features/:id.json
export const patch = async ({ params, request }) => {
    const data = await request.json()
    const id = parseInt(params.id);
    data.category_id = data.category_id || null
    const body = await prisma.feature.update({
        where: { id },
        data
    })
    return { body }
}

// DELETE /features/:id.json
export const del = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.feature.delete({
        where: { id }
    })
    return { body }
}
