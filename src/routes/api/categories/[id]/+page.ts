export const load = async ({ params, fetch }) => {
	const response = await fetch(`/api/categories/${params.id}.json`);
	const category = await response.json();
	return { category };
};
