<script lang="ts">
  const options = [
    { value: 'NOT_PLANNED', label: 'Not Planned' },
    { value: 'PLANNED', label: 'Planned' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'NOT_AVAILABLE', label: 'Not Available' }
  ];

  import Option from '$lib/components/crud/cells/Option.svelte';
  import type { ImplementationStatus } from '@prisma/client';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  export let value: ImplementationStatus;
  export let colspan: number;
  export let rowspan: number;
  export let optional = false;

  let title = options.find((c) => c.value === value)?.label ?? 'Select Implementation Status';
  let menu: HTMLElement;

  let select = (e: CustomEvent) => {
    title = e.detail.label;
    value = e.detail.value;
    console.log('selected', value);
    menu.blur();
  };

  let showContent = false;

  let show = () => {
    showContent = true;
  };
</script>

<td {colspan} {rowspan}>
  <div class="dropdown">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex (see daisyUI issue #2590) -->
    <!-- svelte-ignore a11y-click-events-have-key-events (see daisyUI issue #2590) -->
    <!-- svelte-ignore a11y-no-static-element-interactions (see daisyUI issue #2590) -->
    <div
      tabindex="0"
      class="group btn btn-ghost btn-xs m-1 flex min-w-[16rem] flex-row flex-nowrap justify-between border border-base-300 bg-base-100"
      on:click={show}
    >
      <span>
        {title}
      </span>
      <ChevronDownIcon class="transition-all group-focus-within:rotate-180" size="16" />
    </div>
    {#if showContent}
      <!-- svelte-ignore a11y-no-noninteractive-tabindex (see daisyUI issue #2590) -->
      <ul
        tabindex="0"
        class="no-scrollbar menu dropdown-content z-20 max-h-96 w-96 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
        bind:this={menu}
      >
        <div>
          {#if optional}
            <Option
              value={null}
              prefix=""
              label="No Implementation Status"
              on:select={(e) => select(e)}
            />
          {/if}
          {#each options as { value, label }}
            <Option {value} {label} on:select={(e) => select(e)} />
          {/each}
        </div>
      </ul>
    {/if}
  </div>
</td>
