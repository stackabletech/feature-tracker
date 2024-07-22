<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export let label: string;
  export let prefix: string = '';
  export let parents: string[] = [];

  let dispatch = createEventDispatcher();
  const select = () => dispatch('select', { value, label });
</script>

<div class="mb-1 w-full border-b border-b-base-300 last:-mb-1 last:border-0">
  <!-- svelte-ignore a11y-click-events-have-key-events (see daisyUI issue #2590) -->
  <!-- svelte-ignore a11y-no-static-element-interactions (see daisyUI issue #2590) -->
  <div class="group mb-1 cursor-pointer rounded-lg hover:bg-base-200" on:click={select}>
    {#if parents}
      <div
        class="text-2xs no-scrollbar flex max-w-full flex-row justify-center gap-2 overflow-x-auto font-bold text-base-300 group-hover:overflow-visible group-hover:text-base-content"
      >
        {#each parents as parent}
          <span class="parent">{parent}</span>
        {/each}
      </div>
    {/if}
    <div class="text-center text-base-content">
      {#if prefix}
        <span class="mr-1 text-base-300">{prefix}</span>
      {/if}
      <span class="group-hover:font-bold">
        {label}
      </span>
    </div>
  </div>
</div>

<style>
  .parent::after {
    content: '>';
    margin-left: 0.5rem;
  }

  .parent:last-child::after {
    content: '';
  }
</style>
