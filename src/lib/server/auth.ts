import type { Cookies } from '@sveltejs/kit';
import { PASSWORD } from '$lib/env';

// Fails closed: without a configured PASSWORD nobody is authenticated
export const isAuthenticated = (cookies: Cookies) => !!PASSWORD && cookies.get('pwd') === PASSWORD;
