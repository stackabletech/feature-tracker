<script lang="ts">
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ products } = data);
</script>

<Code filename="/api/products.json">
  <pre>[</pre>
  {#each products as product}
    <button
      class="cursor-pointer text-left font-mono"
      on:click={() => goto(`products/${product.id}`)}>{JSON.stringify(product, null, 2)},</button
    >
  {/each}
  <pre>]</pre>
</Code>
