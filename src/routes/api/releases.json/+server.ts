import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prismaErrorResponse, requiredFieldErrorResponse } from '$lib/api/error.js';
import { getReleases, createRelease } from '$lib/api/release.js';

// GET /releases.json
export const GET: RequestHandler = async () => {
  try {
    const releases = await getReleases();
    return json(releases);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// POST /releases.json
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const { name, date, released } = data;

  if (!name) {
    return requiredFieldErrorResponse('name');
  }

  if (typeof released !== 'boolean') {
    return requiredFieldErrorResponse('released');
  }

  try {
    const release = await createRelease({ name, date, released });
    return json(release, { status: 201 });
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
