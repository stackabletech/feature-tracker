<script lang="ts">
  import type { DBObject } from '$lib/types';
  import { danger } from '$lib/util/alert';

  import Row from './Row.svelte';
  import Cell from './cells/Cell.svelte';

  export let data: DBObject[];
  export let endpoint: string;

  const addRow = async (newRow: Record<string, any>) => {
    const res = await fetch(`${endpoint}.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRow)
    });

    if (res.status === 201) {
      const json = await res.json();
      data = [...data, json];
      newObject = {};
    } else {
      const { code, message } = await res.json();
      danger(`${code}: ${message}`);
    }
  };

  const handleDelete = (e: CustomEvent) =>
    (data = [...data.filter((obj) => obj.id != e.detail.id)]);

  const handlePatch = (e: CustomEvent) =>
    (data = [...data.map((obj) => (obj.id == e.detail.data.id ? e.detail.data : obj))]);

  const keys = (data[0] && Object.keys(data[0])) || [];
  let newObject: Record<string, any> = {};
</script>

<div class="max-w-full overflow-auto">
  <table class="table-xs table table-zebra">
    <thead class="">
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
        <Row bind:data={item} {endpoint} on:patch={handlePatch} on:delete={handleDelete} />
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
</div>
