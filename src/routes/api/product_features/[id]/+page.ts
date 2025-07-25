import type { PageLoad } from './$types';
import type { ProductFeature } from '$lib/prisma';

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/product_features/${params.id}.json`);
  const product_feature: ProductFeature = await response.json();
  return { product_feature };
};
