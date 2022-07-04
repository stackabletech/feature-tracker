<script lang="ts">
	import type { HierarchicalCategory } from '$lib/stores';
	import { filteredFeatures, filteredProducts } from '$lib/stores';

	import FeatureRow from './FeatureRow.svelte';
	import Category from '../cells/Category.svelte';

	export let level: number = 0;
	export let expanded: boolean = false;
	export let forcedOpen: boolean;

	export let category: HierarchicalCategory;
	$: categoryFeatures = $filteredFeatures.filter((f) => f.category_id === category.id);
</script>

<tr class="hover category">
	<!-- First Column: Category Name -->
	<Category {category} bind:expanded {forcedOpen} {level} />
	<!-- Rest Columns: ProductFeature Cells -->
	<td colspan={$filteredProducts.length} />
</tr>

{#if expanded || forcedOpen}
	{#each categoryFeatures as feature, n}
		<FeatureRow {category} {feature} />
	{:else}
		<FeatureRow {category} />
	{/each}

	{#each category.children as child}
		<svelte:self category={child} level={level + 1} {forcedOpen} />
	{/each}
{/if}
