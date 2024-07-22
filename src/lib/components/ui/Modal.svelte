<script lang="ts">
  import { portal } from '$lib/actions/portal';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import CloseButton from './CloseButton.svelte';

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');
</script>

<!-- svelte-ignore a11y-click-events-have-key-events accessible action provided by close button -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions accessible action provided by close button -->
<aside
  class="fixed inset-0 z-40 flex items-center justify-center bg-neutral bg-opacity-50"
  transition:fade={{ duration: 150 }}
  on:click={close}
  use:portal={'#modal'}
>
  <!-- svelte-ignore a11y-click-events-have-key-events accessible action provided by close button -->
  <!-- svelte-ignore a11y-no-static-element-interactions accessible action provided by close button -->
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
