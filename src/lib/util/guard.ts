export const guard = async (fetch, session, base) => {
    const res = await fetch('/api/pwd', { method: 'POST' });

    if (res.status == 200) {
        return base
    }

    return {
        redirect: '/signin',
        status: 301
    }; 
}