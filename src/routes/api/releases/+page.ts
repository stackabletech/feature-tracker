import type { PageLoad } from './$types';
import type { Release } from '$lib/prisma';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch('/api/releases.json');
  const releases: Release[] = await response.json();
  return { releases };
};
