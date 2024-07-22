import { prisma } from '$lib/prisma';

export const getFeatures = async () => {
  return await prisma.feature.findMany({
    orderBy: { name: 'asc' }
  });
};

export const getMinimalFeatures = async () => {
  return await prisma.feature.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });
};

export const getFeature = async (id: number) => {
  return await prisma.feature.findUnique({
    where: { id }
  });
};

export const createFeature = async (data: { name: string; category_id: number; note?: string }) => {
  return await prisma.feature.create({ data });
};

export const updateFeature = async (
  id: number,
  data: { name: string; category_id?: number; note?: string }
) => {
  return await prisma.feature.update({
    where: { id },
    data
  });
};

export const deleteFeature = async (id: number) => {
  return await prisma.feature.delete({
    where: { id }
  });
};
