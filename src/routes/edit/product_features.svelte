<!-- <script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/product_features.json');
		const product_features = await response.json();
		return { props: { product_features } };
	};
</script> -->
<script lang="ts">
	import { productFeatures } from '$lib/stores';
	import Table from '$lib/components/crud/Table.svelte';
	import type { ProductFeature } from '@prisma/client';
	// export let product_features: ProductFeature[];
</script>

<Table bind:data={$productFeatures} endpoint="/api/product_features" />
