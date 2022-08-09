import { prisma } from "$lib/prisma";

// GET /categories/:id.json
export const GET = async ({ params }) => {
    const id = parseInt(params.id);
    
    try {
        const body = await prisma.category.findUnique({
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

// PATCH /categories/:id.json
export const PATCH = async ({ params, request }) => {
    const data = await request.json()
    data.parent_id = data.parent_id || null
    const id = parseInt(params.id);

    if (id === data.parent_id) {
        return {
            status: 400,
            body: {
                code: "INVALID_PARENT_ID",
                message: "Cannot set parent_id to the same value as the category id"
            }
        }
    }
    
    try {
        const body = await prisma.category.update({
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

// DELETE /categories/:id.json
export const DELETE = async ({ params }) => {
    const id = parseInt(params.id);
    
    try {
        const body = await prisma.category.delete({
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
