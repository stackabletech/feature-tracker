import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

// GET /categories/:id.json
export const GET = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const body = await prisma.category.findUnique({
      where: { id }
    });
    return json(body);
  } catch ({ code, message }) {
    return json(
      { code, message },
      {
        status: 500
      }
    );
  }
};

// PATCH /categories/:id.json
export const PATCH = async ({ params, request }) => {
  const data = await request.json();
  data.parent_id = data.parent_id || null;
  const id = parseInt(params.id);

  if (id === data.parent_id) {
    return json(
      {
        code: 'INVALID_PARENT_ID',
        message: 'Cannot set parent_id to the same value as the category id'
      },
      {
        status: 400
      }
    );
  }

  try {
    const body = await prisma.category.update({
      where: { id },
      data
    });
    return json(body);
  } catch ({ code, message }) {
    return json(
      { code, message },
      {
        status: 500
      }
    );
  }
};

// DELETE /categories/:id.json
export const DELETE = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const body = await prisma.category.delete({
      where: { id }
    });
    return json(body);
  } catch ({ code, message }) {
    return json(
      { code, message },
      {
        status: 500
      }
    );
  }
};
