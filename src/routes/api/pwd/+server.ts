import { parse } from "cookie"
import { PASSWORD } from '$lib/env'

// POST /pwd
export const POST = async ({ params, request }) => {
    const cookies = parse(request.headers.get('cookie') || "")
    if (cookies.pwd === PASSWORD) return { status: 200 } 
    else return { status: 401 }
}