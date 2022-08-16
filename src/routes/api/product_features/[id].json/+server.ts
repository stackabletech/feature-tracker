import { prisma } from "$lib/prisma";

// GET /product_features/:id.json
export const GET = async ({ params }) => {
    const id = parseInt(params.id);
    
    try {
        const body = await prisma.productFeature.findUnique({
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

// PATCH /product_features/:id.json
export const PATCH = async ({ params, request }) => {
    const data = await request.json()
    const id = parseInt(params.id);
    
    try {
        const body = await prisma.productFeature.update({
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

// DELETE /product_features/:id.json
export const DELETE = async ({ params }) => {
    const id = parseInt(params.id);
    
    try {
        const body = await prisma.productFeature.delete({
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
