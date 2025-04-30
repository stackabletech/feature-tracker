<script lang="ts">
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/categories.json">
  <pre>[</pre>
  {#each data.categories as category (category.id)}
    <button
      class="cursor-pointer text-left font-mono"
      onclick={() => goto(`categories/${category.id}`)}
    >
      {JSON.stringify(category, null, 2)},
    </button>
  {/each}
  <pre>]</pre>
</Code>
