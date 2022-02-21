import { prisma } from "$lib/prisma";

// GET /product_features/:id.json
export const get = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.productFeature.findUnique({
        where: { id }
    })
    return { body }
}

// PATCH /product_features/:id.json
export const patch = async ({ params, request }) => {
    const data = await request.json()
    const id = parseInt(params.id);
    const body = await prisma.productFeature.update({
        where: { id },
        data
    })
    return { body }
}

// DELETE /product_features/:id.json
export const del = async ({ params }) => {
    const id = parseInt(params.id);
    const body = await prisma.productFeature.delete({
        where: { id }
    })
    return { body }
}
