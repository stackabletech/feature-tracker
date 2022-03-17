<script lang="ts">
	import type { Product } from '@prisma/client';
	import { info, danger } from '$lib/util/alert';

	import { products } from '$lib/stores';

	import AddSiblingButton from '$lib/components/ui/AddSiblingButton.svelte';
	import DeleteButton from '$lib/components/ui/DeleteButton.svelte';
	import TextCell from './TextCell.svelte';
	import Header from './Header.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';

	export let product: Product;

	const addProduct = async (e: CustomEvent) => {
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

	const deleteProduct = async () => {
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
	<TextCell bind:value={product.name} menu on:update={updateProduct}>
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<DeleteButton on:click={deleteProduct} />
			<AddSiblingButton on:click={startAdding} horizontal />
		</div>
	</TextCell>
{/if}
