<script lang="ts">
	import Cell from './cells/Cell.svelte';
	import ExpandableRow from './ExpandableRow.svelte';
	import { getContext, onMount } from 'svelte';
	import type { Category, Feature, Product, ProductFeature } from '$lib/prisma';
	import { default as ProductFeatureCell } from './cells/ProductFeature.svelte';

	let features: Feature[] = getContext('features');
	let products: Product[] = getContext('products');
	let productFeatures: ProductFeature[] = getContext('productFeatures');

	export let level = 0;
	export let category;
	export let expanded = false;
	export let childExpanded = false;

	let categoryFeatures = [];

	onMount(() => {
		categoryFeatures = features.filter((feature) => feature.category_id === category.id);
		if (categoryFeatures.length === 0) {
			categoryFeatures.push({ name: '🚫' });
		}
	});
</script>

{#if expanded}
	{#each categoryFeatures as categoryFeature, n}
		<tr>
			{#if n === 0}
				{#if category.children}
					<td
						on:click={() => (childExpanded = !childExpanded)}
						style="border-left-width: {10 * level}px;"
						class="border-solid border-gray-300"
					>
						<span class="inline-block transition {childExpanded && 'rotate-90'}">➡️</span>
					</td>
				{:else}
					<td style="border-left-width: {10 * level}px;" class="border-solid border-gray-300" />
				{/if}
				<Cell type="id" value={category.id} />
				<Cell type="name" value={category.name} />
			{:else}
				<td
					colspan="3"
					style="border-left-width: {10 * level}px;"
					class="border-solid border-gray-300"
				/>
			{/if}
			<Cell type="name" value={categoryFeature.name} />
			{#each products as product}
				<ProductFeatureCell {product} feature={categoryFeature} />
			{/each}
			<slot />
		</tr>
	{/each}
{/if}

{#if category.children}
	{#each category.children as child}
		<ExpandableRow level={level + 1} category={child} expanded={childExpanded} />
	{/each}
{/if}
