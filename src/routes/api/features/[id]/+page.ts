import type { Feature } from '$lib/prisma';

export const load = async ({ params, fetch }) => {
	const response = await fetch(`/api/features/${params.id}.json`);
	const feature: Feature = await response.json();
	return { feature };
};
