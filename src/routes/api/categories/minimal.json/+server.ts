import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prismaErrorResponse } from '$lib/api/error.js';
import { getMinimalCategories } from '$lib/api/category.js';

// GET /categories/minimal.json
export const GET: RequestHandler = async () => {
  try {
    const categories = await getMinimalCategories();
    return json(categories);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
