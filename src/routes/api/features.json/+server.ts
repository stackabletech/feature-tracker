import { json } from '@sveltejs/kit';
import { getFeatures, createFeature } from '$lib/api/feature';
import { prismaErrorResponse, requiredFieldErrorResponse } from '$lib/api/error';

/*
    Typing disabled because of this bug: https://github.com/prisma/prisma/issues/10404
*/

// GET /features.json
export const GET = async () => {
  try {
    const features = await getFeatures();
    return json(features);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// POST /features.json
export const POST = async ({ request }) => {
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
