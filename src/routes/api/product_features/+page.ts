import type { ProductFeature } from '$lib/prisma';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/product_features.json');
	const product_features: ProductFeature[] = await response.json();
	return { product_features };
};
