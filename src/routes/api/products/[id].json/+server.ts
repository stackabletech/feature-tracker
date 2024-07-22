import { json } from '@sveltejs/kit';
import { prismaErrorResponse } from '$lib/api/error.js';
import { getProduct, updateProduct, deleteProduct } from '$lib/api/product.js';

// GET /products/:id.json
export const GET = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const product = await getProduct(id);
    return json(product);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// PATCH /products/:id.json
export const PATCH = async ({ params, request }) => {
  const id = parseInt(params.id);

  const data = await request.json();
  const { name, code_name, note } = data;

  try {
    const product = await updateProduct(id, { name, code_name, note });
    return json(product);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// DELETE /products/:id.json
export const DELETE = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const product = await deleteProduct(id);
    return json(product);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
