export const load = async ({ params, fetch }) => {
	const response = await fetch(`/api/features/${params.id}.json`);
	const feature = await response.json();
	return { feature };
};
