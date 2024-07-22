<script lang="ts">
  import { marked } from 'marked';
  import Modal from './Modal.svelte';
  import Cell from '../crud/cells/Cell.svelte';
  import { InfoIcon, EditIcon, XCircleIcon, SaveIcon } from 'svelte-feather-icons';

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
    <InfoIcon size="18" class="my-auto mr-2" />
    <h3 class="my-auto font-bold">Details: Feature #{feature.id}</h3>
  </svelte:fragment>
  <main class="flex flex-col gap-2">
    {#if editMode}
      <table class="no-hover table table-xs">
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
      <div class="mt-4 flex flex-row justify-end">
        {#if editMode}
          <button class="btn btn-circle btn-ghost btn-sm" on:click={save}>
            <SaveIcon size="16" />
          </button>
          <button class="btn btn-circle btn-ghost btn-sm" on:click={toggleEditMode}>
            <XCircleIcon size="16" />
          </button>
        {:else}
          <button class="btn btn-circle btn-ghost btn-sm" on:click={toggleEditMode}>
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
