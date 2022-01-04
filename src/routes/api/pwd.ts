import dotenv from 'dotenv'
dotenv.config()

// POST /pwd
export const post = async ({ body: data }: { body }) => {
    console.log(data)
    console.log(process.env.PASSWORD)
    const result = (data.pwd === process.env.PASSWORD) ? true : false;
    return { body: { result } }
}