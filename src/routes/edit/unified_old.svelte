<script lang="ts">
	import { products, categoryTree } from '$lib/stores';
	import EditableHeader from '$lib/components/unified/old_cells/EditableHeader.svelte';
	import CategoryRow from '$lib/components/unified/old_cells/CategoryRow.svelte';
	import { ChevronsRightIcon, MoreHorizontalIcon } from 'svelte-feather-icons';

	let expandAll: boolean = false;

	let toggle = () => {
		expandAll = !expandAll;
	};
</script>

<table class="table table-compact my-2">
	<thead>
		<tr>
			<th class="flex flex-row justify-between items-center group">
				<button class="btn btn-ghost btn-sm btn-circle group-hover:opacity-100" on:click={toggle}>
					<ChevronsRightIcon size="16" class="transition-all {expandAll && 'rotate-90'}" />
				</button>
				<span>Categories</span>
				<button class="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100">
					<MoreHorizontalIcon size="16" />
				</button>
			</th>
			<th class="sticky left-0">Features</th>
			{#each $products as product}
				<EditableHeader value={product.name} scope="col" />
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each $categoryTree as category}
			<CategoryRow {category} forcedOpen={expandAll} />
		{/each}
	</tbody>
	<tfoot />
</table>
