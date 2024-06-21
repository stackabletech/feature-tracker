<script lang="ts">
  import { tick } from 'svelte';

  let classes = '';
  export { classes as class };

  import Header from '$lib/components/unified/cells/Header.svelte';
  import CloseButton from '$lib/components/ui/CloseButton.svelte';
  import FilterButton from '$lib/components/ui/FilterButton.svelte';
  import SortButton from '$lib/components/ui/SortButton.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  import type { Sortable } from '$lib/stores';

  let input: HTMLInputElement;
  export let filter: string = '';
  export let sortable: { [key: string]: Sortable<any> };
  let hover = false;
  let modal = false;

  let edit = async () => {
    editMode = true;
    await tick();
    input.focus();
  };

  let cancel = () => {
    filter = '';
    editMode = false;
  };

  const handle = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancel();
    }
  };

  const showMenu = () => (hover = true);
  const hideMenu = () => (hover = false);
  const showModal = () => (modal = true);
  const hideModal = () => (modal = false);

  let editMode: boolean = filter !== '';
</script>

<Header
  class="{classes} bg-base-300"
  bind:editMode
  on:mouseenter={showMenu}
  on:mouseleave={hideMenu}
>
  <slot name="pre" slot="pre" />

  {#if hover}
    <div class="w-full text-center" on:click={hideMenu}>
      <SortButton on:click={showModal} />
      <FilterButton on:click={edit} />
    </div>
  {:else}
    <span on:click={edit}>
      <slot />
    </span>
  {/if}

  <div slot="edit" class="input-group input-group-sm">
    <input
      class="input input-bordered input-sm"
      type="text"
      placeholder="filter"
      on:keydown={handle}
      bind:value={filter}
      bind:this={input}
    />
    <CloseButton class="btn-outline btn-sm" on:click={cancel} />
  </div>
  <slot name="note" slot="note" />
</Header>

{#if modal}
  <Modal on:close={hideModal}>
    <h3 class="font-bold" slot="title">Sort</h3>
    {#each Object.entries(sortable) as [name, store]}
      <span class="font-bold">{name}:</span>
      <div class="btn-group">
        <button
          class="btn btn-outline btn-xs"
          on:click={store.sort('name', 'asc')}
          on:click={hideModal}>name: a-z</button
        >
        <button
          class="btn btn-outline btn-xs"
          on:click={store.sort('name', 'desc')}
          on:click={hideModal}>name: z-a</button
        >
        <button
          class="btn btn-outline btn-xs"
          on:click={store.sort('id', 'asc')}
          on:click={hideModal}>id: 123</button
        >
        <button
          class="btn btn-outline btn-xs"
          on:click={store.sort('id', 'desc')}
          on:click={hideModal}>id: 321</button
        >
      </div>
    {/each}
  </Modal>
{/if}
