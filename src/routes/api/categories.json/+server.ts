import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prismaErrorResponse, requiredFieldErrorResponse } from '$lib/api/error.js';
import { getCategories, createCategory } from '$lib/api/category.js';

// GET /categories.json
export const GET: RequestHandler = async () => {
  try {
    const categories = await getCategories();
    return json(categories);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// POST /categories.json
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const { name, parent_id, note } = data;

  if (!name) {
    return requiredFieldErrorResponse('name');
  }

  try {
    const category = await createCategory({ name, parent_id, note });
    return json(category, { status: 201 });
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
