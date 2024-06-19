import { json } from '@sveltejs/kit';
import { prismaErrorResponse, requiredFieldErrorResponse } from '$lib/api/error.js';
import { getRelease, updateRelease, deleteRelease } from '$lib/api/release.js';

// GET /release/:id.json
export const GET = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const release = await getRelease(id);
    return json(release);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// PATCH /release/:id.json
export const PATCH = async ({ params, request }) => {
  const id = parseInt(params.id);

  const data = await request.json();
  const { name, date, released } = data;

  if (!name) {
    return requiredFieldErrorResponse('name');
  }

  try {
    const release = await updateRelease(id, { name, date, released });
    return json(release);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// DELETE /release/:id.json
export const DELETE = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const release = await deleteRelease(id);
    return json(release);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
