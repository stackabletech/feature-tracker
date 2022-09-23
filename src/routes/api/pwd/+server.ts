import { parse } from "cookie"
import { PASSWORD } from '$lib/env'

// POST /pwd
export const POST = async ({ request }) => {
    const cookies = parse(request.headers.get('cookie') || "")
    if (cookies.pwd === PASSWORD) return new Response("OK", { status: 200 })
    return new Response("Unauthorized", { status: 401 })
}