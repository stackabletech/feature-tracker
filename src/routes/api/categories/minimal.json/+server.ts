import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

// GET /categories/minimal.json
export const GET = async ({}) => {
  try {
    const body = await prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' }
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
