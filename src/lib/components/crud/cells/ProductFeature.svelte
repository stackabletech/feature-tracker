<script lang="ts">
	import { getContext } from 'svelte';
	import type { Product, Feature, ProductFeature } from '$lib/prisma';
	import Cell from './Cell.svelte';

	let productFeatures: ProductFeature[] = getContext('productFeatures');

	export let product: Product;
	export let feature: Feature;

	$: productFeature = productFeatures.find(
		(p) => p.product_id === product.id && p.feature_id === feature.id
	);
</script>

{#if productFeature}
	<Cell type="implementation_status" value={productFeature.implementation_status} />
	<Cell type="implementation_date" value={productFeature.implementation_date} />
	<Cell type="implementation_version" value={productFeature.implementation_version} />
	<Cell type="note" value={productFeature.note} />
{:else}
	<td class="text-gray-300" colspan="4">no product_feature</td>
{/if}
