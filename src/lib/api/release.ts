import { prisma } from '$lib/prisma';

export const getReleases = async () => {
    return await prisma.release.findMany({
        orderBy: { name: 'asc' }
    });
}

export const getRelease = async (id: number) => {
    return await prisma.release.findUnique({
        where: { id }
    });
}

export const createRelease = async (data: { name: string, released: boolean, date?: Date, }) => {
    return await prisma.release.create({ data });
}

export const updateRelease = async (id: number, data: { name?: string, released?: boolean, date?: Date }) => {
    return await prisma.release.update({
        where: { id },
        data
    });
}

export const deleteRelease = async (id: number) => {
    return await prisma.release.delete({
        where: { id }
    });
}