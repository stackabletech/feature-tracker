import type { LayoutLoad } from './$types';
import { guard } from '$lib/util/guard';

export const load: LayoutLoad = async ({ fetch }) => {
  return guard(fetch, {});
};
