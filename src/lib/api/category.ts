import { prisma } from '$lib/prisma';

export const getCategories = async () => {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
}

export const getMinimalCategories = async () => {
    return await prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' }
    });
}

export const getCategory = async (id: number) => {
    return await prisma.category.findUnique({
        where: { id }
    });
}

export const createCategory = async (data: { name: string, parent_id?: number, note?: string }) => {
    console.log('creating')
    return await prisma.category.create({ data });
}

export const updateCategory = async (id: number, data: { name: string, parent_id?: number, note?: string }) => {
    return await prisma.category.update({
        where: { id },
        data
    });
}

export const deleteCategory = async (id: number) => {
    return await prisma.category.delete({
        where: { id }
    });
}
