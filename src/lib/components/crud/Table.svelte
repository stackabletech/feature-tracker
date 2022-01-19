<script lang="ts">
	import type { DBObject } from '$lib/types';
	import { danger } from '$lib/util/alert';

	import Row from './Row.svelte';
	import Cell from './cells/Cell.svelte';

	export let data: DBObject[];
	export let endpoint: String;

	const addRow = async (newRow) => {
		// remove empty keys from data before posting
		newRow = Object.fromEntries(
			Object.entries(newRow).filter(([_, v]) => v != (undefined || null || ''))
		);

		const res = await fetch(`${endpoint}.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newRow)
		});

		if (res.status === 200) {
			const json = await res.json();
			data = [...data, json];
			newObject = {};
		} else {
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const handleDelete = (e: CustomEvent) => (data = data.filter((obj) => obj.id != e.detail.id));

	const keys = Object.keys(data[0]);
	let newObject = {};
</script>

<table class="table table-zebra">
	<thead>
		<tr>
			{#each keys as key}
				<th>{key}</th>
			{/each}
			<th>Actions:</th>
		</tr>
	</thead>
	<tbody>
		{#each data as item}
			<Row data={item} {endpoint} on:delete={handleDelete} />
		{/each}
		<tr>
			{#each keys as key}
				<Cell bind:value={newObject[key]} type={key} />
			{/each}
			<td>
				<button class="btn btn-ghost" on:click={() => addRow(newObject)}>Add</button>
			</td>
		</tr>
	</tbody>
</table>
