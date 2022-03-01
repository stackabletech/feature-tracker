<script lang="ts">
	import { products, categoryTree } from '$lib/stores';
	import EditableHeader from '$lib/components/unified/data/EditableHeader.svelte';
	import FixedCategory from '$lib/components/unified/data/FixedCategory.svelte';
	import { Maximize2Icon, Minimize2Icon } from 'svelte-feather-icons';
</script>

<table class="table table-zebra table-compact">
	<thead>
		<tr>
			<th />
			<th />
			{#each $products as product}
				<th>
					{product.name}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each $categoryTree as category}
			<FixedCategory {category} />
		{/each}
	</tbody>
	<tfoot> . </tfoot>
</table>
