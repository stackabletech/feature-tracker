<script lang="ts">
	import type { HierarchicalCategory } from '$lib/stores';

	import CategoryCell from '../old_cells/CategoryCell.svelte';
	import { features, products, productFeatures } from '$lib/stores';
	import { ChevronRightIcon, MinusIcon, MoreHorizontalIcon } from 'svelte-feather-icons';

	export let category: HierarchicalCategory;
	export let level: number = 0;

	export let active: boolean = true;

	$: categoryFeatures = $features.filter((f) => f.category_id === category.id);

	$: hasChildren = category.children.length > 0;
	const toggle = () => (active = !active);
	$: ml = 12 * level + 'px';
</script>

{#each categoryFeatures as feature, n}
	<tr class="hover">
		{#if n === 0}
			<th>
				<div class="w-48 flex flex-row justify-between items-center" style:margin-left={ml}>
					{#if hasChildren}
						<button
							class="btn btn-ghost btn-sm btn-circle group-hover:opacity-100"
							on:click={toggle}
						>
							<ChevronRightIcon size="16" class="transition-all {active ? 'rotate-90' : ''}" />
						</button>
					{:else}
						<MinusIcon size="16" class="m-2 opacity-20" />
					{/if}
					<div class="tooltip" data-tip="id: #{category.id}">
						<span>{category.name}</span>
					</div>
					<button class="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100">
						<MoreHorizontalIcon size="16" />
					</button>
				</div>
			</th>
		{:else}
			<th />
		{/if}

		<th class="text-center">
			{feature.name}
		</th>

		{#each $products as product}
			<th class="text-center">
				{$productFeatures.find((f) => f.product_id === product.id && f.feature_id === feature.id)
					?.implementation_status ?? '-'}
			</th>
		{/each}
	</tr>
{:else}
	<tr class="hover">
		<CategoryCell {category} bind:active {level} />
		<th class="text-center">
			<div class="w-48">-</div>
		</th>
		{#each $products as _}
			<td class="text-center">
				<div class="w-48">-</div>
			</td>
		{/each}
	</tr>
{/each}

{#if active}
	{#each category.children as child}
		<svelte:self category={child} level={level + 1} />
	{/each}
{/if}
