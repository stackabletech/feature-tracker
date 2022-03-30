<script lang="ts">
	import type { HierarchicalCategory } from '$lib/stores';
	import { categories } from '$lib/stores';

	import { info, danger } from '$lib/util/alert';

	import AddSiblingButton from '$lib/components/ui/AddSiblingButton.svelte';
	import AddChildButton from '$lib/components/ui/AddChildButton.svelte';
	import DeleteButton from '$lib/components/ui/DeleteButton.svelte';
	import ExpandButton from '$lib/components/ui/ExpandButton.svelte';
	import TextCell from './TextCell.svelte';
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import { GitCommitIcon } from 'svelte-feather-icons';

	export let category: HierarchicalCategory = undefined;
	export let expanded: boolean = false;
	export let forcedOpen: boolean = false;
	export let level: number = 0;

	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	let editable: Writable<boolean> = getContext('editable');

	const addCategory = async (e: CustomEvent) => {
		const res = await fetch('/api/categories.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: e.detail.value, parent_id: parent })
		});

		if (res.ok) {
			const json = await res.json();
			info(`Added category #${json.id}: ${json.name}`);
			$categories = [...$categories, json];
			endAdding();
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const deleteCategory = async () => {
		const res = await fetch(`/api/categories/${category.id}.json`, {
			method: 'DELETE'
		});

		if (res.ok) {
			$categories = [...$categories.filter((f) => f.id !== category.id)];
			info(`Deleted feature #${category.id}: ${category.name}`);
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const updateCategory = async (e: CustomEvent) => {
		const res = await fetch(`/api/categories/${category.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: e.detail.value })
		});

		if (res.ok) {
			const json = await res.json();
			info(`Updated feature #${category.id}: ${json.name}`);
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	$: parent_id = category.parent_id || null;

	let adding: boolean = false;
	let parent;
	const startAdding = (p_id: number) => {
		parent = p_id;
		adding = true;
	};
	const endAdding = () => (adding = false);
</script>

{#if adding}
	<th>
		<div class="w-72">
			<TextInput on:submit={addCategory} on:cancel={endAdding} />
		</div>
	</th>
{:else if category.children.length}
	<TextCell bind:value={category.name} menu={$editable} on:update={updateCategory}>
		<span slot="indent" class="flex flex-row">
			{#each Array(level) as _}
				<GitCommitIcon size="18" class="text-base-300 first:ml-0.5" />
			{/each}
		</span>
		<ExpandButton slot="pre" bind:expanded {forcedOpen} />
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<AddSiblingButton on:click={() => startAdding(parent_id)} />
			<AddChildButton on:click={() => startAdding(category.id)} />
			<DeleteButton on:click={deleteCategory} />
		</div>
	</TextCell>
{:else}
	<TextCell bind:value={category.name} menu={$editable} on:update={updateCategory}>
		<span slot="indent" class="flex flex-row first:ml-0.5">
			{#each Array(level) as _}
				<GitCommitIcon size="18" class="text-base-300" />
			{/each}
		</span>
		<div class="flex flex-row justify-center gap-1" slot="menu">
			<AddSiblingButton on:click={() => startAdding(parent_id)} />
			<AddChildButton on:click={() => startAdding(category.id)} />
			<DeleteButton on:click={deleteCategory} />
		</div>
	</TextCell>
{/if}
