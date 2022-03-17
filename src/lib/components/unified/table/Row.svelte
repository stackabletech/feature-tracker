<script lang="ts">
	import { products, productFeatures } from '$lib/stores';

	import type { HierarchicalCategory } from '$lib/stores';
	import type { Product, Feature as FeatureType } from '$lib/prisma';

	import Category from '../cells/Category.svelte';
	import Feature from '../cells/Feature.svelte';

	import ProductFeature from '$lib/components/unified/cells/ProductFeature.svelte';

	export let showCategory: boolean = true;
	export let expanded: boolean = false;
	export let forcedOpen: boolean = false;
	export let level: number = 0;

	export let category: HierarchicalCategory;
	export let feature: FeatureType = undefined;

	$: border = `${level}rem solid hsl(var(--b2))`;

	const getProductFeature = (p: Product, f: FeatureType) => {
		return $productFeatures.find((pf) => pf.product_id == p?.id && pf.feature_id == f?.id);
	};
</script>

<tr class="hover" style:--border={border}>
	<!-- First Column: Category Header -->
	{#if showCategory}
		<Category {category} bind:expanded {forcedOpen} />
	{:else}
		<th />
	{/if}
	<!-- Second Column: Feature Header -->
	<Feature {feature} {category} />
	<!-- Rest Columns: ProductFeature Cells -->
	{#each $products as product}
		<ProductFeature productFeature={getProductFeature(product, feature)} {product} {feature} />
	{/each}
</tr>

<style>
	:global(tr th:first-child) {
		border-left: var(--border);
	}
</style>
