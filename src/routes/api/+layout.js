import { redirect, error } from '@sveltejs/kit';
import { guard } from '$lib/util/guard';

export const load = async ({ fetch, session }) => {
	return guard(fetch, session, {});
};
