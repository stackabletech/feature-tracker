import type { PageLoad } from './$types';
import type { Product } from '$lib/prisma';

export const load: PageLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/products/${params.id}.json`);
  const product: Product = await response.json();
  return { product };
};
