<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/products.json?foo=bar');
		const products = await response.json();
		return { props: { products } };
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Code from '$lib/components/Code.svelte';
	import type { Product } from '$lib/prisma';
	export let products: Product[];
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
