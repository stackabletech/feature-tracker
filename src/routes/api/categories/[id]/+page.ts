import type { Category } from '$lib/prisma';

export const load = async ({ params, fetch }) => {
	const response = await fetch(`/api/categories/${params.id}.json`);
	const category: Category = await response.json();
	return { category };
};
