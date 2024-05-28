import {guard} from '$lib/util/guard';

export const load = async ({fetch}) => {
  return guard(fetch, {});
};
