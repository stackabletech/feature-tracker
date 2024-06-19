import { json } from '@sveltejs/kit';
import { prismaErrorResponse } from '$lib/api/error';
import { getFeature, updateFeature, deleteFeature } from '$lib/api/feature';

// GET /features/:id.json
export const GET = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const feature = await getFeature(id);
    return json(feature);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// PATCH /features/:id.json
export const PATCH = async ({ params, request }) => {
  const id = parseInt(params.id);
  
  const data = await request.json();
  const { name, category_id, note } = data;

  try {
    const feature = await updateFeature(id, { name, category_id, note });
    return json(feature);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// DELETE /features/:id.json
export const DELETE = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const feature = await deleteFeature(id);
    return json(feature);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
