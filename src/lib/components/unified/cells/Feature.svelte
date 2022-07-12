<script lang="ts">
	import type { Feature, Category } from '$lib/prisma';

	import { features, productFeatures } from '$lib/stores';

	import { info, danger } from '$lib/util/alert';

	import AddSiblingButton from '$lib/components/ui/AddSiblingButton.svelte';
	import AddButton from '$lib/components/ui/AddButton.svelte';
	import DeleteButton from '$lib/components/ui/DeleteButton.svelte';
	import InfoButton from '$lib/components/ui/InfoButton.svelte';

	import Header from './Header.svelte';
	import TextCell from './TextCell.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';

	import FeatureModal from '$lib/components/ui/FeatureModal.svelte';
	import HoverNote from '$lib/components/ui/HoverNote.svelte';

	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	let editable: Writable<boolean> = getContext('editable');
	let showMenu: boolean = false;

	export let feature: Feature = undefined;
	export let category: Category = undefined;

	const addFeature = async (e: CustomEvent) => {
		showMenu = false;

		const res = await fetch('/api/features.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: e.detail.value, category_id: category.id })
		});

		if (res.ok) {
			const json = await res.json();
			info(`Added feature #${json.id}: ${json.name}`);
			$features = [...$features, json];
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
		let dependents = $productFeatures.filter((pf) => pf.feature_id === id);
		dependents.forEach(async (pf) => await deleteProductFeature(pf.id));
		return true;
	};

	const deleteFeature = async () => {
		showMenu = false;

		await deleteProductFeatures(feature.id);

		const res = await fetch(`/api/features/${feature.id}.json`, {
			method: 'DELETE'
		});

		if (res.ok) {
			$features = [...$features.filter((f) => f.id !== feature.id)];
			info(`Deleted feature #${feature.id}: ${feature.name}`);
		} else {
			const { code, message } = await res.json();
			danger(`${code}: ${message}`);
		}
	};

	const updateFeature = async (e: CustomEvent) => {
		const res = await fetch(`/api/features/${feature.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: e.detail.value, category_id: feature.category_id })
		});

		if (res.ok) {
			const json = await res.json();
			info(`Updated feature #${feature.id}: ${json.name}`);
		} else {
			const { code, message } = await res.json();
			danger(`${code}: ${message}`);
		}
	};

	let adding: boolean = false;
	const startAdding = () => (adding = true);
	const endAdding = () => (adding = false);

	let modal: boolean = false;
	const showInfo = () => (modal = true);
	const hideInfo = () => (modal = false);
</script>

{#if adding}
	<th>
		<div class="w-72">
			<TextInput on:submit={addFeature} on:cancel={endAdding} />
		</div>
	</th>
{:else if feature}
	<TextCell
		sticky
		class="left-48"
		bind:value={feature.name}
		bind:showMenu
		menu={$editable}
		on:update={updateFeature}
	>
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<InfoButton on:click={showInfo} />
			<AddSiblingButton on:click={startAdding} />
			<DeleteButton on:click={deleteFeature} />
		</div>
		<svelte:fragment slot="note">
			{#if feature.note}
				<HoverNote note={feature.note} />
			{/if}
		</svelte:fragment>
	</TextCell>
{:else}
	<Header sticky centered class="left-48">
		{#if $editable}
			<AddButton on:click={startAdding} />
		{/if}
	</Header>
{/if}

{#if modal}
	<FeatureModal {feature} on:close={hideInfo} />
{/if}
