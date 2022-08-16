export const load = async ({ params, fetch }) => {
	const response = await fetch(`/api/products/${params.id}.json`);
	const product = await response.json();
	return { product };
};
