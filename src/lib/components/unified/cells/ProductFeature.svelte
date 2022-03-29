<script lang="ts">
	import AddButton from '$lib/components/ui/AddButton.svelte';
	import DeleteButton from '$lib/components/ui/DeleteButton.svelte';

	import { productFeatures, products } from '$lib/stores';

	import { info, danger } from '$lib/util/alert';

	import ImplementationIcon from '$lib/components/ui/ImplementationIcon.svelte';
	import ProductFeatureInput from '$lib/components/ui/ProductFeatureInput.svelte';
	import type { Feature, Product, ProductFeature } from '$lib/prisma';
	import { MinusIcon } from 'svelte-feather-icons';
	import Data from './Data.svelte';

	export let product: Product = undefined;
	export let feature: Feature = undefined;
	export let productFeature: ProductFeature = undefined;

	let addProductFeature = async (e: CustomEvent) => {
		console.log('adding:', product.name, feature.name, e.detail);
		const res = await fetch('/api/product_features.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				product_id: product.id,
				feature_id: feature.id,
				implementation_status: e.detail.status,
				implementation_date: e.detail.date
			})
		});

		if (res.ok) {
			const json = await res.json();
			info(`Added product feature #${json.id}: ${json.product_id} ${json.feature_id}`);
			$productFeatures = [...$productFeatures, json];
			$products = [...$products]; // forces rerendering of the table
			endAdding();
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	let deleteProductFeature = async () => {
		const res = await fetch(`/api/product_features/${productFeature.id}.json`, {
			method: 'DELETE'
		});

		if (res.ok) {
			$productFeatures = [...$productFeatures.filter((pf) => pf.id !== productFeature.id)];
			$products = [...$products]; // forces rerendering of the table
			info(
				`Deleted product feature #${productFeature.id}: ${productFeature.product_id} ${productFeature.feature_id}`
			);
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	let updateProductFeature = async (e: CustomEvent) => {
		const res = await fetch(`/api/product_features/${productFeature.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				implementation_status: e.detail.status,
				implementation_date: e.detail.date
			})
		});

		if (res.ok) {
			editMode = false;
			productFeature.implementation_status =
				e.detail.status || productFeature.implementation_status;
			productFeature.implementation_date = e.detail.date || productFeature.implementation_date;
			const json = await res.json();
			info(`Updated product feature #${json.id}: ${json.product_id} ${json.feature_id}`);
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	$: date = new Date(productFeature?.implementation_date).toLocaleDateString(undefined, {
		month: 'short',
		year: 'numeric'
	});

	let adding: boolean = false;
	const startAdding = () => (adding = true);
	const endAdding = () => (adding = false);

	let editMode: boolean = false;
	let toggleEditMode = () => (editMode = !editMode);
</script>

{#if adding}
	<th>
		<div class="w-72">
			<ProductFeatureInput on:submit={addProductFeature} on:cancel={endAdding} />
		</div>
	</th>
{:else if editMode}
	<th>
		<div class="w-72">
			<ProductFeatureInput on:submit={updateProductFeature} on:cancel={toggleEditMode} />
		</div>
	</th>
{:else if productFeature}
	<Data menu centered>
		<div class="flex flex-row gap-2 items-center cursor-cell" on:click={toggleEditMode}>
			<ImplementationIcon status={productFeature.implementation_status} />
			<date>{date}</date>
		</div>
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<DeleteButton on:click={deleteProductFeature} />
		</div>
	</Data>
{:else if product && feature}
	<Data centered>
		<AddButton on:click={startAdding} />
	</Data>
{:else}
	<Data centered>
		<MinusIcon size="16" class="mx-auto text-base-300" />
	</Data>
{/if}
