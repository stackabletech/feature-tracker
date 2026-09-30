import type { RequestHandler } from './$types';
import { isAuthenticated } from '$lib/server/auth';

// POST /pwd
export const POST: RequestHandler = async ({ cookies }) => {
  if (isAuthenticated(cookies)) {
    return new Response('OK', { status: 200 });
  }
  return new Response('Unauthorized', { status: 401 });
};
