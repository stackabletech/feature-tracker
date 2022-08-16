<!-- <script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/categories.json');
		const categories = await response.json();
		return { props: { categories } };
	};
</script> -->
<script lang="ts">
	import { categories } from '$lib/stores';
	import Table from '$lib/components/crud/Table.svelte';
	import type { Category } from '$lib/prisma';
	// export let categories: Category[];
</script>

<Table bind:data={$categories} endpoint="/api/categories" />
