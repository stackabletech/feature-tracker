import type { Release } from '$lib/prisma';

export const load = async ({ params, fetch }) => {
  const response = await fetch(`/api/releases/${params.id}.json`);
  const release: Release = await response.json();
  return { release };
};
