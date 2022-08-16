import type { Feature } from '$lib/prisma';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/features.json');
	const features: Feature[] = await response.json();
	return { features };
};
