export const load = async ({ fetch }) => {
	const response = await fetch('/api/products.json');
	const products = await response.json();
	return { products };
};
