<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/product_features.json');
		const product_features = await response.json();
		return { props: { product_features } };
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Code from '$lib/components/Code.svelte';
	import type { ProductFeature } from '@prisma/client';
	export let product_features: ProductFeature[];
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
