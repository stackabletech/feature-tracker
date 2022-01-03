<script context="module" lang="ts">
	export const load = async ({ page, fetch }) => {
		const response = await fetch(`/api/products/${page.params.id}.json`);
		const product = await response.json();
		return { props: { product } };
	};
</script>

<script lang="ts">
	import type { Product } from '@prisma/client';
	import Code from '$lib/components/Code.svelte';
	export let product: Product;
</script>

<Code>
	<pre> {JSON.stringify(product, null, 2)} </pre>
</Code>
