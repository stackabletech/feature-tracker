<script lang="ts">
	import { goto } from '$app/navigation';
	import Code from '$lib/components/Code.svelte';
	// FIXME check this import / generated types
	import type { PageData } from './$types';
	import type { Product } from '$lib/prisma';

	export let data: PageData;
	$: ({ products } = data);
</script>

<Code filename="/api/products.json">
	<pre>[</pre>
	{#each products as product}
		<pre class="cursor-pointer" on:click={() => goto(`products/${product.id}`)}>
			{JSON.stringify(product, null, 2)},
		</pre>
	{/each}
	<pre>]</pre>
</Code>
