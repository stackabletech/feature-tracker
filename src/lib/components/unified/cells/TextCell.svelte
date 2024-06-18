<script lang="ts">
  import TextInput from '$lib/components/ui/TextInput.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { getContext } from 'svelte';

  let editable: Writable<boolean> = getContext('editable');
  let dispatch = createEventDispatcher();

  import Header from '../cells/Header.svelte';
  import Data from '../cells/Data.svelte';

  let classes: string = '';
  export { classes as class };

  export let value: string = '';
  export let menu: boolean = false;
  export let sticky: boolean = false;
  export let showMenu: boolean = false;

  export let header: boolean = true;
  $: type = header ? Header : Data;

  let editMode: boolean = false;

  let toggleEditMode = () => {
    editMode = $editable && !editMode;
  };

  let handleSubmit = (e: CustomEvent) => {
    value = e.detail.value;
    dispatch('update', { value });
    toggleEditMode();
  };

  let handleCancel = () => {
    toggleEditMode();
  };
</script>

<svelte:component this={type} {menu} bind:editMode {sticky} bind:showMenu {...{ class: classes }}>
  <slot name="indent" slot="indent" />
  <slot name="pre" slot="pre" />
  <svelte:fragment slot="edit">
    <TextInput {value} on:submit={handleSubmit} on:cancel={handleCancel} />
  </svelte:fragment>
  <span on:click={toggleEditMode} class={$editable && 'cursor-cell'}>{value}</span>
  <slot name="menu" slot="menu" />
  <slot name="note" slot="note" />
  <slot name="post" slot="post" />
</svelte:component>
