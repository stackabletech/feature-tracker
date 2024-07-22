import { json } from '@sveltejs/kit';
import { prismaErrorResponse } from '$lib/api/error.js';
import { getMinimalProducts } from '$lib/api/product.js';

// GET /products/minimal.json
export const GET = async () => {
  try {
    const products = await getMinimalProducts();
    return json(products);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
