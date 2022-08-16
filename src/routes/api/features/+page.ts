export const load = async ({ fetch }) => {
	const response = await fetch('/api/features.json');
	const features = await response.json();
	return { features };
};
