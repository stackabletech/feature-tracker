<script lang="ts">
	import FilterableHeader from '$lib/components/unified/cells/FilterableHeader.svelte';
	import Header from '$lib/components/unified/cells/Header.svelte';
	import Product from '$lib/components/unified/cells/Product.svelte';
	import Table from '$lib/components/unified/table/Table.svelte';

	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import { productFilter, filteredProducts, productFeatures } from '$lib/stores';
	import RoadMapCell from '$lib/components/unified/cells/RoadMapCell.svelte';

	const dates = [...new Set($productFeatures.map((pf) => pf.implementation_date).sort())];

	let editable: Writable<boolean> = writable(false);
	setContext('editable', editable);
</script>

<div class="grow overflow-auto flex flex-col">
	<Table>
		<svelte:fragment slot="head">
			<!-- Product Header -->
			<FilterableHeader bind:filter={$productFilter} class="rounded-tl-lg">
				Products
			</FilterableHeader>
			<!-- Date Headers -->
			{#each dates as date}
				<Header centered>
					{new Date(date).toLocaleDateString(undefined, {
						month: 'short',
						year: 'numeric'
					})}
				</Header>
			{/each}
		</svelte:fragment>
		<svelte:fragment>
			{#each $filteredProducts as product}
				<tr>
					<!-- Product Titles -->
					<Product {product} />
					<!-- Features -->
					{#each dates as date}
						<td class="text-center">
							<div class="flex flex-row justify-center">
								{#each $productFeatures.filter((pf) => pf.product_id === product.id && pf.implementation_date === date) as productFeature}
									<RoadMapCell {productFeature} />
								{/each}
							</div>
						</td>
					{/each}
				</tr>
			{/each}
		</svelte:fragment>
	</Table>
</div>
