<script lang="ts">
	import { products, categoryTree } from '$lib/stores';
	import EditableHeader from '$lib/components/unified/data/EditableHeader.svelte';
	import CategoryRow from '$lib/components/unified/data/CategoryRow.svelte';
	import { Maximize2Icon, Minimize2Icon } from 'svelte-feather-icons';
</script>

<table class="table table-zebra table-compact">
	<thead>
		<tr>
			<th />
			<th />
			{#each $products as product}
				<EditableHeader value={product.name} scope="col" />
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each $categoryTree as category}
			<CategoryRow {category} />
		{/each}
	</tbody>
	<tfoot> . </tfoot>
</table>
