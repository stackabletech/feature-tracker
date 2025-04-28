<script lang="ts">
  import { releases } from '$lib/stores';
  import { CheckIcon, XIcon } from 'svelte-feather-icons';
  import { createEventDispatcher } from 'svelte';
  import type { ImplementationStatus } from '@prisma/client';

  let dispatch = createEventDispatcher<Record<string, unknown>>();

  const submit = () => {
    dispatch('submit', { status, release });
  };

  const cancel = () => {
    dispatch('cancel');
  };

  export let release: number | null = null;
  export let status: ImplementationStatus = 'NOT_PLANNED';

  let globalShortcuts = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      submit();
      return;
    }

    if (e.key === 'Escape') {
      cancel();
    }
  };
</script>

<svelte:window on:keydown={globalShortcuts} />

<div class="form-control max-w-full">
  <label class="m-1 flex max-w-full flex-row items-center">
    <div class="tooltip" data-tip="Select Status">
      <select
        class="select select-xs rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md"
        bind:value={status}
      >
        <option value="NOT_PLANNED" selected>Not Planned</option>
        <option value="PLANNED">Planned</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="NOT_AVAILABLE">Not Available</option>
      </select>
    </div>
    <div class="tooltip" data-tip="Select Release">
      <select class="select select-xs m-0 rounded-none" bind:value={release}>
        <option value={null}>No Release</option>
        {#each $releases as release (release.id)}
          <option value={release.id} selected>{release.name}</option>
        {/each}
      </select>
    </div>
    <div class="tooltip" data-tip="Submit">
      <button
        class="btn btn-square btn-outline btn-success btn-xs m-0 rounded-none"
        on:click={submit}
      >
        <CheckIcon size="16" />
      </button>
    </div>
    <div class="tooltip" data-tip="Cancel">
      <button
        class="btn btn-square btn-outline btn-error btn-xs text-error-content m-0 rounded-l-none rounded-r-md"
        on:click={cancel}
      >
        <XIcon size="16" />
      </button>
    </div>
  </label>
</div>
