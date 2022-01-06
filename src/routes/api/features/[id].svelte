<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch(`/api/features/${params.id}.json`);
		const feature = await response.json();
		return { props: { feature } };
	};
</script>

<script lang="ts">
	import Code from '$lib/components/Code.svelte';
	import type { Feature } from '@prisma/client';
	export let feature: Feature;
</script>

<Code>
	<pre> {JSON.stringify(feature, null, 2)} </pre>
</Code>
