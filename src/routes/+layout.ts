export const load = async ({ fetch }) => {
	const productResponse = await fetch('/api/products.json');
	const categoryResponse = await fetch('/api/categories.json');
	const featuresResponse = await fetch('/api/features.json');
	const productFeaturesResponse = await fetch('/api/product_features.json');

	const products = await productResponse.json();
	const categories = await categoryResponse.json();
	const features = await featuresResponse.json();
	const productFeatures = await productFeaturesResponse.json();

	return {
		products,
		categories,
		features,
		productFeatures
	};
};
