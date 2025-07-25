import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prismaErrorResponse } from '$lib/api/error';
import { getMinimalFeatures } from '$lib/api/feature';

// GET /features/minimal.json
export const GET: RequestHandler = async () => {
  try {
    const features = await getMinimalFeatures();
    return json(features);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
