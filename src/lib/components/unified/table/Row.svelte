<script lang="ts">
	import { GitCommitIcon } from 'svelte-feather-icons';
	import { products, productFeatures } from '$lib/stores';

	import type { HierarchicalCategory } from '$lib/stores';
	import type { Product, Feature as FeatureType } from '$lib/prisma';

	import Category from '../cells/Category.svelte';
	import Feature from '../cells/Feature.svelte';
	import Header from '../cells/Header.svelte';

	import ProductFeature from '$lib/components/unified/cells/ProductFeature.svelte';

	export let showCategory: boolean = true;
	export let expanded: boolean = false;
	export let forcedOpen: boolean = false;
	export let level: number = 0;

	export let category: HierarchicalCategory;
	export let feature: FeatureType = undefined;

	const getProductFeature = (p: Product, f: FeatureType) => {
		return $productFeatures.find((pf) => pf.product_id == p?.id && pf.feature_id == f?.id);
	};
</script>

<tr class="hover">
	<!-- First Column: Category Header -->
	{#if showCategory}
		<Category {category} bind:expanded {forcedOpen} {level} />
	{:else}
		<Header>
			<span slot="indent" class="flex flex-row">
				{#each Array(level) as _}
					<GitCommitIcon size="14" class="text-base-300" />
				{/each}
			</span>
		</Header>
	{/if}
	<!-- Second Column: Feature Header -->
	<Feature {feature} {category} />
	<!-- Rest Columns: ProductFeature Cells -->
	{#each $products as product}
		<ProductFeature productFeature={getProductFeature(product, feature)} {product} {feature} />
	{/each}
</tr>
