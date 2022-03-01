<script lang="ts">
	import type { HierarchicalCategory } from '$lib/stores';

	import CategoryCell from './CategoryCell.svelte';
	import { features, products, productFeatures } from '$lib/stores';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import EditableHeader from './EditableHeader.svelte';
	import ProductFeatureCell from './ProductFeatureCell.svelte';

	export let category: HierarchicalCategory;
	export let level: number = 0;

	export let active: boolean = false;

	$: categoryFeatures = $features.filter((f) => f.category_id === category.id);
</script>

{#each categoryFeatures as feature, n}
	<tr class="hover">
		{#if n === 0}
			<CategoryCell {category} bind:active {level} />
		{:else}
			<th />
		{/if}

		<EditableHeader scope="row" value={feature.name} />

		{#each $products as product}
			{#if $productFeatures.find((f) => f.product_id === product.id && f.feature_id === feature.id)}
				<ProductFeatureCell
					productFeature={$productFeatures.find(
						(pf) => pf.product_id === product.id && pf.feature_id === feature.id
					)}
				/>
			{:else}
				<td class="text-center">
					<div class="w-48">
						<div class="tooltip" data-tip="add product feature">
							<button class="btn btn-ghost btn-circle btn-sm">
								<PlusCircleIcon size="12" />
							</button>
						</div>
					</div>
				</td>
			{/if}
		{/each}
	</tr>
{:else}
	<tr class="hover">
		<CategoryCell {category} bind:active {level} />
		<th class="text-center">
			<div class="w-48">
				<div class="tooltip" data-tip="add feature">
					<button class="btn btn-ghost btn-circle btn-sm">
						<PlusCircleIcon size="12" />
					</button>
				</div>
			</div>
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
