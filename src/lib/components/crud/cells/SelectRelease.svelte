<script lang="ts">
  import { releases } from '$lib/stores';
  import Option from '$lib/components/crud/cells/Option.svelte';
  import { ChevronDownIcon } from 'svelte-feather-icons';
  import { derived } from 'svelte/store';

  export let value: any = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
  export let colspan: number;
  export let rowspan: number;
  export let optional = false;

  let input: HTMLInputElement;
  let filter = '';
  $: filteredReleases = derived(releases, ($) => {
    return $.filter((releases) => {
      return releases.name.toLowerCase().includes(filter.toLowerCase());
    });
  });

  let title = $releases.find((c) => c.id === value)?.name ?? 'Select Release';
  let menu: HTMLElement;

  let select = (e: CustomEvent) => {
    title = e.detail.label;
    value = e.detail.value;
    cancel();
  };

  const cancel = () => {
    filter = '';
    input.blur();
    menu.blur();
  };

  let showContent = false;

  let show = () => {
    showContent = true;
    input.focus();
  };
</script>

<td {colspan} {rowspan}>
  <div class="dropdown">
    <!-- svelte-ignore a11y-click-events-have-key-events (see daisyUI issue #2590) -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex (see daisyUI issue #2590) -->
    <!-- svelte-ignore a11y-no-static-element-interactions (see daisyUI issue #2590) -->
    <div
      tabindex="0"
      class="group btn btn-ghost btn-xs m-1 flex min-w-[16rem] flex-row flex-nowrap justify-between border border-base-300 bg-base-100"
      on:click={show}
    >
      <span>
        {#if value}<span class="text-primary">#{value}:</span>{/if}
        {title}
        <input
          type="text"
          class="h-0 w-0 opacity-0"
          bind:value={filter}
          bind:this={input}
          on:keydown={(e) => {
            e.key === 'Escape' && cancel();
          }}
          autocomplete="off"
        />
      </span>
      <ChevronDownIcon class="transition-all group-focus-within:rotate-180" size="16" />
    </div>
    {#if showContent}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex (see daisyUI issue #2590) -->
      <ul
        tabindex="0"
        class="no-scrollbar menu dropdown-content z-20 max-h-96 w-96 overflow-y-auto rounded-box bg-base-100 p-2 shadow-sm"
        bind:this={menu}
      >
        <div>
          <span class="text-center text-primary">
            {filter === '' ? 'start typing to filter' : filter}
          </span>
          {#if optional}
            <Option value={null} prefix="" label="No Release" on:select={(e) => select(e)} />
          {/if}
          {#each $filteredReleases as { id, name } (id)}
            <Option value={id} prefix="#{id}" label={name} on:select={(e) => select(e)} />
          {/each}
        </div>
      </ul>
    {/if}
  </div>
</td>
