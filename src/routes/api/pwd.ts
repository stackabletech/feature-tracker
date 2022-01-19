import { parse } from "cookie"
import { PASSWORD } from '$lib/env'

// POST /pwd
export const post = async ({ headers }) => {
    const cookies = parse(headers.cookie || "")
    if (cookies.pwd === PASSWORD) return { status: 200 } 
    else return { status: 401 }
}