<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    filename?: string;
    children: Snippet;
  }

  let { filename, children }: Props = $props();
</script>

<main class="p-8">
  {#if filename}
    <pre>{filename}</pre>
  {/if}
  <div class="bg-base-300 rounded-xl p-8 text-sm">
    {@render children()}
  </div>
</main>
