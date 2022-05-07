<script lang="ts">
	import type { Product } from '$lib/prisma';
	import { info, danger } from '$lib/util/alert';

	import { products, productFeatures } from '$lib/stores';

	import AddSiblingButton from '$lib/components/ui/AddSiblingButton.svelte';
	import DeleteButton from '$lib/components/ui/DeleteButton.svelte';
	import TextCell from './TextCell.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';

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
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const deleteProductFeature = async (id: number) => {
		const res = await fetch(`/api/product_features/${id}.json`, {
			method: 'DELETE'
		});

		if (res.ok) {
			info(`Deleted dependent product feature #${id}`);
			$productFeatures = [...$productFeatures.filter((pf) => pf.id !== id)];
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const deleteProductFeatures = async (id: number) => {
		let dependents = $productFeatures.filter((pf) => pf.product_id === id);
		dependents.forEach(async (pf) => await deleteProductFeature(pf.id));
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
			danger(`${res.status}: ${res.statusText}`);
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
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	let adding: boolean = false;
	const startAdding = () => (adding = true);
	const endAdding = () => (adding = false);
</script>

{#if adding}
	<th>
		<div class="w-72">
			<TextInput on:submit={addProduct} on:cancel={endAdding} />
		</div>
	</th>
{:else}
	<TextCell bind:value={product.name} menu={$editable} bind:showMenu on:update={updateProduct}>
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<DeleteButton on:click={deleteProduct} />
			<AddSiblingButton on:click={startAdding} horizontal />
		</div>
	</TextCell>
{/if}
