<script lang="ts">
  import { featuresWithParents } from '$lib/stores';
  import Option from '$lib/components/crud/cells/Option.svelte';
  import { ChevronDownIcon } from 'svelte-feather-icons';
  import { derived } from 'svelte/store';

  export let value: any = undefined;
  export let colspan: number;
  export let rowspan: number;
  export let optional = false;

  let input: HTMLInputElement;
  let filter = '';
  $: filteredFeaturesWithParents = derived(featuresWithParents, ($) => {
    return $.filter((feature) => {
      return feature.name.toLowerCase().includes(filter.toLowerCase());
    });
  });
  $: path =
    $filteredFeaturesWithParents.find((c) => c.id === value)?.parents.join(' > ') ?? undefined;

  let title = $featuresWithParents.find((c) => c.id === value)?.name ?? 'Select Feature';
  let menu: HTMLElement;

  let select = (e: CustomEvent) => {
    title = e.detail.label;
    value = e.detail.value;
    console.log('selected', value);
    cancel();
  };

  const cancel = () => {
    filter = '';
    input.blur();
    menu.blur();
  };
</script>

<td {colspan} {rowspan}>
  <div class={path && 'tooltip'} data-tip={path}>
    <div class="dropdown">
      <div
        tabindex="0"
        class="group btn btn-ghost m-1 flex min-w-[16rem] flex-row flex-nowrap justify-between border border-base-300 bg-base-100"
        on:click={() => input.focus()}
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
      <ul
        tabindex="0"
        class="menu dropdown-content rounded-box w-96 bg-base-100 p-2 shadow"
        bind:this={menu}
      >
        <span class="text-center text-primary">
          {filter === '' ? 'start typing to filter' : filter}
        </span>
        {#if optional}
          <Option value={null} prefix="" label="No Feature" on:select={(e) => select(e)} />
        {/if}
        {#each $filteredFeaturesWithParents as { id, name, parents } (id)}
          <Option value={id} prefix="#{id}" label={name} {parents} on:select={(e) => select(e)} />
        {/each}
      </ul>
    </div>
  </div>
</td>
