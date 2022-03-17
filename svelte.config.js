import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: vercel(),
		vite: {
			ssr: {
				// external: ['.prisma/client/index-browser', '.prisma/client/index']
				// noExternal: ['@prisma/client']
			}
		}
	}
};

export default config;
