import dotenv from 'dotenv'
dotenv.config()

// POST /pwd
export const post = async ({ body: data }: { body }) => {
    data = JSON.parse(data)
    const result = (data.pwd === process.env.PASSWORD) ? true : false;
    return { body: { result } }
}