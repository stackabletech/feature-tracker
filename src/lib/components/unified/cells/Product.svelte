<script lang="ts">
	import type { Product } from '$lib/prisma';
	import { info, danger } from '$lib/util/alert';

	import { products, productFeatures } from '$lib/stores';

	import AddSiblingButton from '$lib/components/ui/AddSiblingButton.svelte';
	import DeleteButton from '$lib/components/ui/DeleteButton.svelte';
	import TextCell from './TextCell.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import HoverNote from '$lib/components/ui/HoverNote.svelte';

	import { InfoIcon } from 'svelte-feather-icons';

	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	let editable: Writable<boolean> = getContext('editable');
	let showMenu: boolean = false;

	export let product: Product;

	const addProduct = async (e: CustomEvent) => {
		showMenu = false;

		const res = await fetch('/api/products.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: e.detail.value })
		});

		if (res.ok) {
			const json = await res.json();
			info(`Added product #${json.id}: ${json.name}`);
			$products = [...$products, json];
			endAdding();
		} else {
			const { code, message } = await res.json();
			danger(`${code}: ${message}`);
		}
	};

	const deleteProductFeature = async (id: number) => {
		const res = await fetch(`/api/product_features/${id}.json`, {
			method: 'DELETE'
		});

		if (res.ok) {
			const deletedProductFeature = await res.json();
			info(`Deleted dependent product feature #${deletedProductFeature.id}`);
			$productFeatures = [...$productFeatures.filter((pf) => pf.id !== deletedProductFeature.id)];
			return true;
		} else {
			const { code, message } = await res.json();
			danger(`${code}: ${message}`);
			return false;
		}
	};

	const deleteProductFeatures = async (id: number) => {
		let dependents = $productFeatures.filter((pf) => pf.product_id === id);
		dependents.forEach(async (pf) => await deleteProductFeature(pf.id));
		return true;
	};

	const deleteProduct = async () => {
		showMenu = false;

		await deleteProductFeatures(product.id);

		const res = await fetch(`/api/products/${product.id}.json`, {
			method: 'DELETE'
		});

		if (res.ok) {
			$products = [...$products.filter((f) => f.id !== product.id)];
			info(`Deleted product #${product.id}: ${product.name}`);
		} else {
			const { code, message } = await res.json();
			danger(`${code}: ${message}`);
		}
	};

	const updateProduct = async (e: CustomEvent) => {
		const res = await fetch(`/api/products/${product.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: e.detail.value })
		});

		if (res.ok) {
			const json = await res.json();
			info(`Updated feature #${product.id}: ${json.name}`);
		} else {
			const { code, message } = await res.json();
			danger(`${code}: ${message}`);
		}
	};

	let adding: boolean = false;
	const startAdding = () => (adding = true);
	const endAdding = () => (adding = false);
</script>

{#if adding}
	<th>
		<div class="w-72">
			<TextInput on:submit={addProduct} on:cancel={endAdding} placeholder="Enter product name" />
		</div>
	</th>
{:else}
	<TextCell bind:value={product.name} menu={$editable} bind:showMenu on:update={updateProduct}>
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<DeleteButton on:click={deleteProduct} />
			<AddSiblingButton on:click={startAdding} horizontal />
		</div>
		<svelte:fragment slot="note">
			{#if product.note}
				<HoverNote note={product.note} />
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{#if product.note}
				<InfoIcon size="16" class="text-base opacity-25 group-hover:opacity-100" />
			{/if}
		</svelte:fragment>
	</TextCell>
{/if}
