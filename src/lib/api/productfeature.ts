import { prisma, type ImplementationStatus } from '$lib/prisma';

export const getProductFeatures = async () => {
  return prisma.productFeature.findMany();
};

export const getProductFeature = async (id: number) => {
  return prisma.productFeature.findUnique({
    where: { id }
  });
};

export const createProductFeature = async (data: {
  product_id: number;
  feature_id: number;
  implementation_status: ImplementationStatus;
  release_id?: number;
  note?: string;
}) => {
  return prisma.productFeature.create({ data });
};

export const updateProductFeature = async (
  id: number,
  data: {
    product_id?: number;
    feature_id?: number;
    implementation_status?: ImplementationStatus;
    release_id?: number;
    note?: string;
  }
) => {
  return prisma.productFeature.update({
    where: { id },
    data
  });
};

export const deleteProductFeature = async (id: number) => {
  return prisma.productFeature.delete({
    where: { id }
  });
};
