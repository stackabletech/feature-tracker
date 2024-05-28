<script lang="ts">
  import {portal} from '$lib/actions/portal';
  import {clickOutsideAction} from '$lib/actions/clickOutside';

  import CloseButton from '$lib/components/ui/CloseButton.svelte';
  import MenuButton from '$lib/components/ui/MenuButton.svelte';

  export let menu: boolean = false;
  export let showMenu: boolean = false;

  export let editMode: boolean = false;
  export let centered: boolean = false;

  let toggleMenu = () => {
    showMenu = !showMenu;
  };

  let toggleEditMode = () => {
    editMode = false;
  };

  let showNote = () => {
    note = true;
  };

  let hideNote = () => {
    note = false;
  };

  let note = false;
</script>

<div
  class="flex flex-row items-center transition-all w-full min-w-[12rem]
    {centered ? 'justify-between' : 'justify-start'}
    "
  on:pointerover={showNote}
  on:pointerleave={hideNote}
>
  {#if showMenu}
    <div class="flex flex-row items-between w-full" use:clickOutsideAction on:clickoutside={toggleMenu}>
      <slot name="indent"/>
      <div class="w-8">
        <slot name="pre"/>
      </div>
      <div class="grow">
        <slot name="menu"/>
      </div>
      <div class="w-8">
        <CloseButton on:click={toggleMenu}/>
      </div>
    </div>
  {:else if editMode}
    <div class="mx-2 text-center" use:clickOutsideAction on:clickoutside={toggleEditMode}>
      <slot name="edit"/>
    </div>
  {:else}
    <slot name="indent"/>
    <div class="w-8">
      <slot name="pre"/>
    </div>
    <div class="mx-2 grow {centered && 'text-center'}">
      <slot/>
    </div>
    <div class="w-8">
      {#if menu}
        <MenuButton on:click={toggleMenu}/>
      {:else}
        <slot name="post"/>
      {/if}
    </div>
  {/if}
</div>

{#if note}
  <div class="note" use:portal={'#mouse'}>
    <slot name="note"/>
  </div>
{/if}
