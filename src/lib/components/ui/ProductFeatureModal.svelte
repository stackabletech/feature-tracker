<script lang="ts">
	import Modal from './Modal.svelte';
	import Cell from '../crud/cells/Cell.svelte';
	import { InfoIcon, EditIcon, XCircleIcon, SaveIcon } from 'svelte-feather-icons';
	import ImplementationIcon from '$lib/components/ui/ImplementationIcon.svelte';

	import { getContext, createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { info, danger } from '$lib/util/alert';

	import { productFeatures } from '$lib/stores';
	import type { Feature, Product, ProductFeature } from '@prisma/client';

	const dispatch = createEventDispatcher();
	let editable: Writable<boolean> = getContext('editable');
	let editMode: boolean = false;

	export let product: Product;
	export let feature: Feature;
	export let productFeature: ProductFeature;

	let toggleEditMode = () => (editMode = !editMode);

	let save = async () => {
		const res = await fetch(`/api/product_features/${productFeature.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(productFeature)
		});

		if (res.status === 200) {
			const patchedProductFeature: ProductFeature = await res.json();
			info('Patched Product Feature #' + patchedProductFeature.id);
			$productFeatures = [
				...$productFeatures.map((obj) =>
					obj.id == patchedProductFeature.id ? patchedProductFeature : obj
				)
			];
			return dispatch('close');
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};
</script>

<Modal on:close>
	<svelte:fragment slot="title">
		<InfoIcon size="18" class="mr-2 my-auto" />
		<h3 class="font-bold my-auto">Details: Product Feature #{productFeature.id}</h3>
	</svelte:fragment>
	<main class="flex flex-col gap-2">
		{#if editMode}
			<table class="table table-compact no-hover">
				<tr>
					<td>Product:</td>
					<Cell type="product_id" bind:value={productFeature.product_id} />
				</tr>
				<tr>
					<td>Feature:</td>
					<Cell type="feature_id" bind:value={productFeature.feature_id} />
				</tr>
				<tr>
					<td>Status:</td>
					<Cell type="implementation_status" bind:value={productFeature.implementation_status} />
				</tr>
				<tr>
					<td>Date:</td>
					<Cell type="implementation_date" bind:value={productFeature.implementation_date} />
				</tr>
				<tr>
					<td>Version:</td>
					<Cell type="implementation_version" bind:value={productFeature.implementation_version} />
				</tr>
				<tr>
					<td>Note:</td>
					<Cell type="note" bind:value={productFeature.note} />
				</tr>
			</table>
		{:else}
			<div class="flex flex-row justify-between">
				<p>Product:</p>
				<p class="font-bold">{product.name}</p>
			</div>
			<div class="flex flex-row justify-between">
				<p>Feature:</p>
				<p class="font-bold">{feature.name}</p>
			</div>
			<div class="flex flex-row justify-between">
				<p>Status:</p>
				<p class="flex font-bold">
					<ImplementationIcon status={productFeature.implementation_status} class="m-auto mr-1" />
					{productFeature.implementation_status}
				</p>
			</div>
			<div class="flex flex-row justify-between">
				<p>Date:</p>
				<p class="font-bold">
					{new Date(productFeature?.implementation_date).toLocaleDateString(undefined, {
						month: 'short',
						year: 'numeric'
					})}
				</p>
			</div>
			{#if productFeature.implementation_version}
				<div class="flex flex-row justify-between">
					<p>Version:</p>
					<p class="font-bold">{productFeature.implementation_version}</p>
				</div>
			{/if}
			{#if productFeature.note}
				<div class="flex flex-row justify-between">
					<p>Note:</p>
					<p class="font-bold">{productFeature.note}</p>
				</div>
			{/if}
		{/if}
		{#if $editable}
			<div class="flex flex-row justify-end mt-4">
				{#if editMode}
					<button class="btn btn-sm btn-circle btn-ghost" on:click={save}>
						<SaveIcon size="16" />
					</button>
					<button class="btn btn-sm btn-circle btn-ghost" on:click={toggleEditMode}>
						<XCircleIcon size="16" />
					</button>
				{:else}
					<button class="btn btn-sm btn-circle btn-ghost" on:click={toggleEditMode}>
						<EditIcon size="16" />
					</button>
				{/if}
			</div>
		{/if}
	</main>
</Modal>

<style>
	/* Unset the table hover style applied by DaisyUI */
	:global(table.no-hover td) {
		background-color: unset !important;
	}
</style>
