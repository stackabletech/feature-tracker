import { redirect, error } from '@sveltejs/kit';

export const guard = async (fetch, base) => {
    const res = await fetch('/api/pwd', { method: 'POST' });
    if (res.status == 200) return base
    throw error(res.status, 'Please log in to edit data.');
}