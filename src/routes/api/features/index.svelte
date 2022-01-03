<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/features.json');
		const features = await response.json();
		return { props: { features } };
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Code from '$lib/components/Code.svelte';
	import type { Feature } from '@prisma/client';
	export let features: Feature[];
</script>

<Code filename="/api/features.json">
	<pre>[</pre>
	{#each features as feature}
		<pre class="cursor-pointer" on:click={() => goto(`features/${feature.id}`)}>
				{JSON.stringify(feature, null, 2)},
			</pre>
	{/each}
	<pre>]</pre>
</Code>
