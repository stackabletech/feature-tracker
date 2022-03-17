<script context="module" lang="ts">
	export const load = async ({ params, fetch }) => {
		const response = await fetch(`/api/product_features/${params.id}.json`);
		const product_feature = await response.json();
		return { props: { product_feature } };
	};
</script>

<script lang="ts">
	import type { ProductFeature } from '$lib/prisma';
	import Code from '$lib/components/Code.svelte';
	export let product_feature: ProductFeature;
</script>

<Code>
	<pre> {JSON.stringify(product_feature, null, 2)} </pre>
</Code>
