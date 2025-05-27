<script lang="ts">
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/product_features.json">
  <pre>[</pre>
  {#each data.product_features as product_feature (product_feature.id)}
    <button
      class="cursor-pointer text-left font-mono"
      onclick={() => goto(`product_features/${product_feature.id}`)}
    >
      {JSON.stringify(product_feature, null, 2)},
    </button>
  {/each}
  <pre>]</pre>
</Code>
