export const load = async ({ fetch }) => {
	const response = await fetch('/api/product_features.json');
	const product_features = await response.json();
	return { product_features };
};
