<script lang="ts">
	import ExpandButton from '$lib/components/ui/ExpandButton.svelte';
	import Header from '$lib/components/unified/cells/Header.svelte';
	import Product from '$lib/components/unified/cells/Product.svelte';
	import ExpandableCategory from '$lib/components/unified/table/ExpandableCategory.svelte';
	import Table from '$lib/components/unified/table/Table.svelte';

	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import { products, categoryTree, features } from '$lib/stores';

	let expandAll: boolean = false;
	let editable: Writable<boolean> = writable(false);

	setContext('editable', editable);
</script>

<div class="grow overflow-auto flex flex-col">
	<Table>
		<svelte:fragment slot="head">
			<!-- Category Header -->
			<Header class="bg-base-300">
				<ExpandButton slot="pre" double bind:expanded={expandAll} />
				Categories
			</Header>
			<!-- Feature Header -->
			<Header sticky class="left-48 bg-base-300">Features</Header>
			<!-- Product Values -->
			{#each $products as product}
				<Product {product} />
			{/each}
		</svelte:fragment>
		<svelte:fragment>
			{#each $categoryTree as category}
				<ExpandableCategory {category} forcedOpen={expandAll} />
			{/each}
		</svelte:fragment>
	</Table>
</div>
