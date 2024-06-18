import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { Prisma } from '@prisma/client';

// GET /product_features/:id.json
export const GET = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const body = await prisma.productFeature.findUnique({
      where: { id }
    });
    return json(body);
  } catch (e) {
    return json(e, {
      status: 500
    });
  }
};

// PATCH /product_features/:id.json
export const PATCH = async ({ params, request }) => {
  const data = await request.json();
  const id = parseInt(params.id);

  try {
    const body = await prisma.productFeature.update({
      where: { id },
      data
    });
    return json(body);
  } catch (e) {
    return json(e, {
      status: 500
    });
  }
};

// DELETE /product_features/:id.json
export const DELETE = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const body = await prisma.productFeature.delete({
      where: { id }
    });
    return json(body);
  } catch (e) {
    return json(e, {
      status: 500
    });
  }
};
