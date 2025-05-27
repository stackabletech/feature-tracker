import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prismaErrorResponse, requiredFieldErrorResponse } from '$lib/api/error.js';
import { getProducts, createProduct } from '$lib/api/product.js';

// GET /products.json
export const GET: RequestHandler = async () => {
  try {
    const products = await getProducts();
    return json(products);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// POST /products.json
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();

  const { name } = data;

  if (!name) {
    return requiredFieldErrorResponse('name');
  }

  try {
    const product = await createProduct({ name });
    return json(product, { status: 201 });
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
