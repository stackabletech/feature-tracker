<script lang="ts">
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ product_features } = data);
</script>

<Code filename="/api/product_features.json">
  <pre>[</pre>
  {#each product_features as product_feature}
    <pre class="cursor-pointer" on:click={() => goto(`product_features/${product_feature.id}`)}>
				{JSON.stringify(product_feature, null, 2)},
			</pre>
  {/each}
  <pre>]</pre>
</Code>
