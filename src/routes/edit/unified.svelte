<script lang="ts">
	import ExpandButton from '$lib/components/ui/ExpandButton.svelte';
	import FilterableHeader from '$lib/components/unified/cells/FilterableHeader.svelte';
	import Product from '$lib/components/unified/cells/Product.svelte';
	import ExpandableCategory from '$lib/components/unified/table/ExpandableCategory.svelte';
	import Table from '$lib/components/unified/table/Table.svelte';

	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import {
		filteredProducts,
		categoryTree,
		categoryFilter,
		featureFilter,
		productFilter
	} from '$lib/stores';

	let expandAll: boolean = false;
	let editable: Writable<boolean> = writable(true);

	setContext('editable', editable);
</script>

<Table>
	<svelte:fragment slot="head">
		<tr>
			<th colspan="2" class="bg-transparent" />
			<FilterableHeader bind:filter={$productFilter} class="rounded-tl-lg"
				>Products</FilterableHeader
			>
			<th colspan={$filteredProducts.length - 1} class="bg-base-300" />
		</tr>
		<tr>
			<FilterableHeader bind:filter={$categoryFilter}>
				<ExpandButton slot="pre" double bind:expanded={expandAll} />
				Categories
			</FilterableHeader>

			<!-- Feature Header -->
			<FilterableHeader bind:filter={$featureFilter}>Features</FilterableHeader>

			<!-- Product Values -->
			{#each $filteredProducts as product (product.id)}
				<Product {product} />
			{/each}
		</tr>
	</svelte:fragment>
	<svelte:fragment>
		{#each $categoryTree as category (category.id)}
			<ExpandableCategory {category} forcedOpen={expandAll} />
		{/each}
	</svelte:fragment>
</Table>
