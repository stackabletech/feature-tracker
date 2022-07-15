<script lang="ts">
	import { marked } from 'marked';
	import Modal from './Modal.svelte';
	import Cell from '../crud/cells/Cell.svelte';
	import { InfoIcon, EditIcon, XCircleIcon, SaveIcon } from 'svelte-feather-icons';
	import ImplementationIcon from '$lib/components/ui/ImplementationIcon.svelte';

	import { getContext, createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { info, danger } from '$lib/util/alert';

	import { features } from '$lib/stores';
	import type { Feature } from '@prisma/client';

	const dispatch = createEventDispatcher();
	let editable: Writable<boolean> = getContext('editable');
	let editMode: boolean = $editable;

	export let feature: Feature;

	let toggleEditMode = () => (editMode = !editMode);

	let save = async () => {
		const res = await fetch(`/api/features/${feature.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(feature)
		});

		if (res.status === 200) {
			const patchedFeature: Feature = await res.json();
			info('Patched Feature #' + patchedFeature.id);
			$features = [...$features.map((obj) => (obj.id == patchedFeature.id ? patchedFeature : obj))];
			return dispatch('close');
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};
</script>

<Modal on:close>
	<svelte:fragment slot="title">
		<InfoIcon size="18" class="mr-2 my-auto" />
		<h3 class="font-bold my-auto">Details: Feature #{feature.id}</h3>
	</svelte:fragment>
	<main class="flex flex-col gap-2">
		{#if editMode}
			<table class="table table-compact no-hover">
				<tr>
					<td>Name:</td>
					<Cell type="name" bind:value={feature.name} />
				</tr>
				<tr>
					<td>Note:</td>
					<Cell type="note" bind:value={feature.note} />
				</tr>
			</table>
		{:else}
			<div class="flex flex-row justify-between">
				<p>Name:</p>
				<p class="font-bold">{feature.name}</p>
			</div>
			{#if feature.note}
				<div class="flex flex-row justify-between">
					<p>Note:</p>
					<div class="prose">{@html marked.parse(feature.note)}</div>
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
