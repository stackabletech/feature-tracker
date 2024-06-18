import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

// GET /features/ids.json
export const GET = async ({}) => {
  try {
    const body = await prisma.feature.findMany({
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
