export const load = async ({ fetch }) => {
	const response = await fetch('/api/products.json?foo=bar');
	const products = await response.json();
	return { products };
};
