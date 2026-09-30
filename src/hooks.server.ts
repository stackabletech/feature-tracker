import type { Handle } from '@sveltejs/kit';
import { unauthorizedErrorResponse } from '$lib/api/error';
import { isAuthenticated } from '$lib/server/auth';

const READ_METHODS = ['GET', 'HEAD', 'OPTIONS'];

// Every write (POST/PUT/PATCH/DELETE) needs the password cookie, except the password check itself
export const handle: Handle = async ({ event, resolve }) => {
  if (
    !READ_METHODS.includes(event.request.method) &&
    event.url.pathname !== '/api/pwd' &&
    !isAuthenticated(event.cookies)
  ) {
    return unauthorizedErrorResponse();
  }
  return resolve(event);
};
