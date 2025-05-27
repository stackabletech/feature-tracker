import { prisma } from '$lib/prisma';

export const getReleases = async () => {
  return prisma.release.findMany({
    orderBy: { name: 'asc' }
  });
};

export const getRelease = async (id: number) => {
  return prisma.release.findUnique({
    where: { id }
  });
};

export const createRelease = async (data: { name: string; released: boolean; date?: Date }) => {
  return prisma.release.create({ data });
};

export const updateRelease = async (
  id: number,
  data: { name?: string; released?: boolean; date?: Date }
) => {
  return prisma.release.update({
    where: { id },
    data
  });
};

export const deleteRelease = async (id: number) => {
  return prisma.release.delete({
    where: { id }
  });
};
