<script lang="ts">
	import ExpandButton from '$lib/components/ui/ExpandButton.svelte';
	import FilterableHeader from '$lib/components/unified/cells/FilterableHeader.svelte';
	import Product from '$lib/components/unified/cells/Product.svelte';
	import CategoryRow from '$lib/components/unified/table/CategoryRow.svelte';
	import Table from '$lib/components/unified/table/Table.svelte';
	import DisplayButton from '$lib/components/ui/DisplayButton.svelte';
	import DisplayModal from '$lib/components/ui/DisplayModal.svelte';

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

	let settingsModal: boolean = false;
	const showSettings = () => (settingsModal = true);
	const hideSettings = () => (settingsModal = false);

	setContext('editable', editable);
</script>

<Table>
	<svelte:fragment slot="head">
		<tr>
			<th class="bg-transparent">
				<DisplayButton on:click={showSettings} />
			</th>
			<FilterableHeader bind:filter={$productFilter} class="rounded-tl-lg left-96">
				Products
			</FilterableHeader>
			<th colspan={$filteredProducts.length - 1} class="bg-base-300" />
		</tr>
		<tr>
			<!-- Feature Header -->
			<FilterableHeader bind:filter={$categoryFilter}>
				<ExpandButton slot="pre" double bind:expanded={expandAll} />
				Features
			</FilterableHeader>

			<!-- Product Values -->
			{#each $filteredProducts as product (product.id)}
				<Product {product} />
			{/each}
		</tr>
	</svelte:fragment>
	<svelte:fragment>
		{#each $categoryTree as category (category.id)}
			<CategoryRow {category} forcedOpen={expandAll} />
		{/each}
	</svelte:fragment>
</Table>

{#if settingsModal}
	<DisplayModal on:close={hideSettings} />
{/if}
