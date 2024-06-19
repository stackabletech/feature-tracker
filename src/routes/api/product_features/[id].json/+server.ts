import { json } from '@sveltejs/kit';
import { prismaErrorResponse } from '$lib/api/error';
import {
  getProductFeature,
  updateProductFeature,
  deleteProductFeature
} from '$lib/api/productfeature';

// GET /product_features/:id.json
export const GET = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const product_feature = await getProductFeature(id);
    return json(product_feature);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// PATCH /product_features/:id.json
export const PATCH = async ({ params, request }) => {
  const id = parseInt(params.id);

  const data = await request.json();
  const { product_id, feature_id, implementation_status, release_id, note } = data;

  try {
    const product_feature = await updateProductFeature(id, {
      product_id,
      feature_id,
      implementation_status,
      release_id,
      note
    });
    return json(product_feature);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};

// DELETE /product_features/:id.json
export const DELETE = async ({ params }) => {
  const id = parseInt(params.id);

  try {
    const product_feature = await deleteProductFeature(id);
    return json(product_feature);
  } catch (e) {
    return prismaErrorResponse(e);
  }
};
