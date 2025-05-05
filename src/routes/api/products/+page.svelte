<script lang="ts">
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/products.json">
  <pre>[</pre>
  {#each data.products as product (product.id)}
    <button
      class="cursor-pointer text-left font-mono"
      onclick={() => goto(`products/${product.id}`)}
    >
      {JSON.stringify(product, null, 2)},
    </button>
  {/each}
  <pre>]</pre>
</Code>
