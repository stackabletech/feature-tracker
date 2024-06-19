import { prisma } from '$lib/prisma';

export const getProducts = async () => {
  return await prisma.product.findMany({
    orderBy: { name: 'asc' }
  });
};

export const getMinimalProducts = async () => {
  return await prisma.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });
};

export const getProduct = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

export const createProduct = async (data: { name: string; code_name?: string; note?: string }) => {
  return await prisma.product.create({ data });
};

export const updateProduct = async (
  id: number,
  data: { name: string; code_name?: string; note?: string }
) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id }
  });
};
