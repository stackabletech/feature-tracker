export const load = async ({ params, fetch }) => {
	const response = await fetch(`/api/product_features/${params.id}.json`);
	const product_feature = await response.json();
	return { product_feature };
};
