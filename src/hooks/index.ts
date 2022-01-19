import { parse } from "cookie"

export const handle = async ({ request, resolve }) => {
	const response = await resolve(request)
	return response
}

export const getSession = ({ headers }) => { 
	const cookies = parse(headers.cookie || "")
	return { cookies };
}