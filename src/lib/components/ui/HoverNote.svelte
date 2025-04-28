<script lang="ts">
  import { marked } from 'marked';
  import { fade } from 'svelte/transition';

  export let note: string | null = null;
</script>

<div
  class="base-content prose bg-base-200 prose-h1:text-lg prose-h2:text-sm rounded-md p-4 text-sm whitespace-normal shadow-md"
  transition:fade={{ duration: 200 }}
>
  {#if $$slots.pre}
    <div class="text-base-content text-opacity-50 text-sm">
      <slot name="pre" />
    </div>
  {/if}
  {#if note}
    {@html marked(note)}
  {/if}
</div>
