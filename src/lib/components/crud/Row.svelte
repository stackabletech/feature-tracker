<script lang="ts">
  import type { DBObject } from '$lib/types';
  import { info, danger } from '$lib/util/alert';

  import { createEventDispatcher } from 'svelte';
  import Cell from './cells/Cell.svelte';

  export let data: DBObject;
  export let endpoint: string;

  $: id = data.id;
  const dispatch = createEventDispatcher();

  const patchRow = async (data: Record<string, any>) => {
    const res = await fetch(`${endpoint}/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.status === 200) {
      const json = await res.json();
      info('Patched row #' + id);
      dispatch('patch', { data });
      return json;
    } else {
      const { code, message } = await res.json();
      danger(`${code}: ${message}`);
    }
  };

  const deleteRow = async () => {
    const res = await fetch(`${endpoint}/${id}.json`, {
      method: 'DELETE'
    });

    if (res.status === 200) {
      dispatch('delete', { id });
      info(`Deleted row #${id}`);
      return true;
    } else {
      const { code, message } = await res.json();
      danger(`${code}: ${message}`);
    }
  };

  const keys = Object.keys(data);
  let values = Object.values(data);

  $: patchedObject = Object.fromEntries(
    keys.map((key, i) => [key, values[i]]).filter(([_, v]) => v != (undefined || null || ''))
  );
</script>

<tr>
  {#each values as value, i}
    <Cell bind:value type={keys[i]} />
  {/each}

  <td>
    <button class="btn btn-ghost focus:btn-outline" on:click={() => patchRow(patchedObject)}>
      Save
    </button>
    <button class="btn btn-ghost focus:btn-outline" on:click={() => deleteRow()}>Delete</button>
  </td>
</tr>
