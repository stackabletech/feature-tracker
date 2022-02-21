import type { RequestEvent } from "@sveltejs/kit"
import { parse } from "cookie"

export const handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response
}

export const getSession = (event: RequestEvent) => { 
	const cookies = parse(event.request.headers.get('cookie') || "")
	return cookies;
}