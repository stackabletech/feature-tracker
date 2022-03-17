<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/features.json');
		const features = await response.json();
		return { props: { features } };
	};
</script>

<script lang="ts">
	import Table from '$lib/components/crud/Table.svelte';
	import type { Feature } from '$lib/prisma';
	export let features: Feature[];
</script>

<Table data={features} endpoint="/api/features" />
