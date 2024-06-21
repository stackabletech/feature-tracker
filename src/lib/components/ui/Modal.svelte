<script lang="ts">
  import { portal } from '$lib/actions/portal';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import CloseButton from './CloseButton.svelte';

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');
</script>

<aside
  class="bg-neutral-focus fixed inset-0 z-40 flex items-center justify-center bg-opacity-40 backdrop-blur"
  transition:fade={{ duration: 200 }}
  on:click={close}
  use:portal={'#modal'}
>
  <div
    class="card max-h-[80%] w-[32rem] max-w-[80%] bg-base-200 shadow-xl"
    on:click|stopPropagation
  >
    <div class="card-body">
      <header class="mb-2 flex">
        <div class="flex grow align-middle">
          <slot name="title" />
        </div>
        <div class="justify-end">
          <CloseButton on:click={close} tipPlacement="left" />
        </div>
      </header>
      <slot />
    </div>
  </div>
</aside>
