<!-- <script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/products.json');
		const products = await response.json();
		return { props: { products } };
	};
</script> -->
<script lang="ts">
	import { products } from '$lib/stores';
	import Table from '$lib/components/crud/Table.svelte';
	import type { Product } from '$lib/prisma';
	// export let products: Product[];
</script>

<Table bind:data={$products} endpoint="/api/products" />
