<script lang="ts">
	import type { Feature, Category } from '@prisma/client';

	import { features } from '$lib/stores';

	import { info, danger } from '$lib/util/alert';

	import AddSiblingButton from '$lib/components/ui/AddSiblingButton.svelte';
	import AddButton from '$lib/components/ui/AddButton.svelte';
	import DeleteButton from '$lib/components/ui/DeleteButton.svelte';

	import Header from './Header.svelte';
	import TextCell from './TextCell.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';

	export let feature: Feature = undefined;
	export let category: Category = undefined;

	const addFeature = async (e: CustomEvent) => {
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
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const deleteFeature = async () => {
		const res = await fetch(`/api/features/${feature.id}.json`, {
			method: 'DELETE'
		});

		if (res.ok) {
			$features = [...$features.filter((f) => f.id !== feature.id)];
			info(`Deleted feature #${feature.id}: ${feature.name}`);
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const updateFeature = async (e: CustomEvent) => {
		const res = await fetch(`/api/features/${feature.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: e.detail.value })
		});

		if (res.ok) {
			const json = await res.json();
			info(`Updated feature #${feature.id}: ${json.name}`);
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
			<TextInput on:submit={addFeature} on:cancel={endAdding} />
		</div>
	</th>
{:else if feature}
	<TextCell sticky bind:value={feature.name} menu on:update={updateFeature}>
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<AddSiblingButton on:click={startAdding} />
			<DeleteButton on:click={deleteFeature} />
		</div>
	</TextCell>
{:else}
	<Header sticky>
		<AddButton on:click={startAdding} />
	</Header>
{/if}
