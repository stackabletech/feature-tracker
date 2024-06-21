<script lang="ts">
  import type { DBObject } from '$lib/types';
  import { danger } from '$lib/util/alert';
  import { FilePlusIcon } from 'svelte-feather-icons';

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

<div class="overflow-aut max-w-full">
  <table class="table-xs table-pin-rows table table-zebra">
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
        <Row bind:data={item} {endpoint} on:patch={handlePatch} on:delete={handleDelete} />
      {:else}
        <tr>
          <td>No Data</td>
          <td>No Actions</td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr class="border-t-2 bg-base-300">
        {#each keys as key}
          <Cell bind:value={newObject[key]} type={key} />
        {:else}
          <td>No Data</td>
        {/each}
        <td>
          <div class="flex justify-center">
            <button class="btn btn-ghost btn-sm gap-1" on:click={() => addRow(newObject)}>
              <FilePlusIcon size="16" class="text-primary" />
              Add
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</div>
