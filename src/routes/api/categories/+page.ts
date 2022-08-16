export const load = async ({ fetch }) => {
	const response = await fetch('/api/categories.json');
	const categories = await response.json();
	return { categories };
};
