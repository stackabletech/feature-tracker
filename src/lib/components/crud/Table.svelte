<script lang="ts">
	import type { DBObject } from '$lib/types';
	import { danger } from '$lib/util/alert';

	import Row from './Row.svelte';
	import Cell from './cells/Cell.svelte';

	export let data: DBObject[];
	export let endpoint: string;

	const addRow = async (newRow) => {
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
			console.log(res);
			danger(`${res.status}: ${res.statusText}`);
		}
	};

	const handleDelete = (e: CustomEvent) =>
		(data = [...data.filter((obj) => obj.id != e.detail.id)]);

	const keys = (data[0] && Object.keys(data[0])) || [];
	let newObject = {};
</script>

<table class="table table-compact table-zebra my-2">
	<thead>
		<tr>
			{#each keys as key}
				<th>{key}</th>
			{:else}
				<th>No Data</th>
			{/each}
			<th>Actions:</th>
		</tr>
	</thead>
	<tbody>
		{#each data as item (item.id)}
			<Row data={item} {endpoint} on:delete={handleDelete} />
		{:else}
			<tr>
				<td>No Data</td>
				<td>No Actions</td>
			</tr>
		{/each}
		<tr>
			{#each keys as key}
				<Cell bind:value={newObject[key]} type={key} />
			{:else}
				<td>No Data</td>
			{/each}
			<td>
				<button class="btn btn-ghost" on:click={() => addRow(newObject)}>Add</button>
			</td>
		</tr>
	</tbody>
</table>
