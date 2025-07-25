import type { PageLoad } from './$types';
import type { Category } from '$lib/prisma';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch('/api/categories.json');
  const categories: Category[] = await response.json();
  return { categories };
};
