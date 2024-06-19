import { json } from '@sveltejs/kit';
import { prismaErrorResponse } from '$lib/api/error';
import { getCategory, updateCategory, deleteCategory } from '$lib/api/category';

// GET /categories/:id.json
export const GET = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const category = await getCategory(id);
    return json(category);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// PATCH /categories/:id.json
export const PATCH = async ({ params, request }) => {
  const id = parseInt(params.id);
  
  const data = await request.json();
  const { name, parent_id, note } = data;

  if (id === data.parent_id) {
    return json(
      {
        code: 'INVALID_PARENT_ID',
        message: 'Cannot set parent_id to the same value as the category id'
      }, {
        status: 400
      }
    );
  }

  try {
    const category = await updateCategory(id, { name, parent_id, note });
    return json(category);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// DELETE /categories/:id.json
export const DELETE = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const category = await deleteCategory(id);
    return json(category);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
