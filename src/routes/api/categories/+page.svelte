<script lang="ts">
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ categories } = data);
</script>

<Code filename="/api/categories.json">
  <pre>[</pre>
  {#each categories as category (category.id)}
    <button
      class="cursor-pointer text-left font-mono"
      on:click={() => goto(`categories/${category.id}`)}
      >{JSON.stringify(category, null, 2)},</button
    >
  {/each}
  <pre>]</pre>
</Code>
