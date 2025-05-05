import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prismaErrorResponse, requiredFieldErrorResponse } from '$lib/api/error.js';
import { getProductFeatures, createProductFeature } from '$lib/api/productfeature.js';

// GET /product_features.json
export const GET: RequestHandler = async () => {
  try {
    const product_features = await getProductFeatures();
    return json(product_features);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// POST /product_features.json
export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();

  const { product_id, feature_id, implementation_status, release_id, note } = data;

  if (!product_id) {
    return requiredFieldErrorResponse('product_id');
  }

  if (!feature_id) {
    return requiredFieldErrorResponse('feature_id');
  }

  if (!implementation_status) {
    return requiredFieldErrorResponse('implementation_status');
  }

  try {
    const product_feature = await createProductFeature({
      product_id,
      feature_id,
      implementation_status,
      release_id,
      note
    });
    return json(product_feature, { status: 201 });
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
