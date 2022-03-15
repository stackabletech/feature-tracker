<script lang="ts">
	import ExpandButton from '$lib/components/ui/ExpandButton.svelte';
	import Header from '$lib/components/unified/cells/Header.svelte';
	import TextHeader from '$lib/components/unified/old_cells/TextHeader.svelte';
	import Table from '$lib/components/unified/table/Table.svelte';

	import { products, categoryTree } from '$lib/stores';

	let expandAll: boolean = false;
</script>

<Table>
	<svelte:fragment slot="head">
		<Header class="bg-base-300">
			<ExpandButton slot="pre" double bind:expanded={expandAll} />
			Categories
		</Header>
		<Header sticky class="bg-base-300">Features</Header>
		{#each $products as product}
			<TextHeader menu value={product.name} />
		{/each}
	</svelte:fragment>
	<svelte:fragment />
</Table>
