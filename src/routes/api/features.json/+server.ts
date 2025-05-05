import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getFeatures, createFeature } from '$lib/api/feature';
import { prismaErrorResponse, requiredFieldErrorResponse } from '$lib/api/error';

// GET /features.json
export const GET: RequestHandler = async () => {
  try {
    const features = await getFeatures();
    return json(features);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// POST /features.json
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const { name, category_id, note } = data;

  if (!name) {
    return requiredFieldErrorResponse('name');
  }

  if (!category_id) {
    return requiredFieldErrorResponse('category_id');
  }

  try {
    const category = await createFeature({ name, category_id, note });
    return json(category, { status: 201 });
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
