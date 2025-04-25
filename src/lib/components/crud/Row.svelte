<script lang="ts">
  import type { DBObject } from '$lib/types';
  import { info, danger } from '$lib/util/alert';

  import { createEventDispatcher } from 'svelte';
  import Cell from './cells/Cell.svelte';
  import { Trash2Icon, SaveIcon } from 'svelte-feather-icons';

  export let data: DBObject;
  export let endpoint: string;

  $: id = data.id;
  const dispatch = createEventDispatcher<Record<string, unknown>>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    keys
      .map((key, i) => [key, values[i]])
      .filter(([_, v]) => v != undefined || v != null || v != '')
  );
</script>

<tr>
  {#each values as value, i (i)}
    <Cell bind:value type={keys[i]} />
  {/each}

  <td>
    <div class="flex justify-center">
      <button
        class="btn btn-ghost btn-sm focus:btn-outline gap-1"
        on:click={() => patchRow(patchedObject)}
      >
        <SaveIcon size="16" class="text-success" />
        Save
      </button>
      <button class="btn btn-ghost btn-sm focus:btn-outline gap-1" on:click={() => deleteRow()}>
        <Trash2Icon size="16" class="text-error" />
        Delete
      </button>
    </div>
  </td>
</tr>
