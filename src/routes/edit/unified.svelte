<script context="module" lang="ts">
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
			props: {
				products,
				categories,
				features,
				productFeatures
			}
		};
	};
</script>

<script lang="ts">
	export let products;
	export let categories;
	export let features;
	export let productFeatures;

	import { setContext } from 'svelte';

	setContext('products', products);
	setContext('categories', categories);
	setContext('features', features);
	setContext('productFeatures', productFeatures);

	import Cell from '$lib/components/crud/cells/Cell.svelte';
	import ExpandableRow from '$lib/components/crud/ExpandableRow.svelte';

	const categoryTree = categories.reduce((tree, category) => {
		if (category.parent_id === null) {
			tree.push(category);
		} else {
			const parent = categories.find((c) => c.id === category.parent_id);
			if (parent.children === undefined) {
				parent.children = [];
			}
			parent.children.push(category);
		}
		return tree;
	}, []);

	console.log(categoryTree);
</script>

<table class="table table-zebra">
	<thead>
		<td colspan="3">Category</td>
		<td>Feature</td>
		{#each products as product}
			<Cell bind:value={product.name} type="name" colspan={4} />
		{/each}
	</thead>
	<tbody>
		{#each categoryTree as category}
			<ExpandableRow {category} expanded />
		{/each}
	</tbody>
</table>
