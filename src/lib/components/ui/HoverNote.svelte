<script lang="ts">
  import { marked } from 'marked';
  import { fade } from 'svelte/transition';

  export let note: string = undefined;
</script>

<div
  class="base-content prose whitespace-normal rounded-md bg-base-200 p-4 text-sm shadow-md prose-h1:text-lg prose-h2:text-sm"
  transition:fade={{ duration: 200 }}
>
  {#if $$slots.pre}
    <div class="text-sm text-base-content text-opacity-50">
      <slot name="pre" />
    </div>
  {/if}
  {#if note}
    {@html marked(note)}
  {/if}
</div>
