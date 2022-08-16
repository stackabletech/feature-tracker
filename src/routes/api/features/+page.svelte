<script lang="ts">
	import { goto } from '$app/navigation';
	import Code from '$lib/components/Code.svelte';
	// FIXME check this import / generated types
	import type { PageData } from './$types';
	import type { Feature } from '$lib/prisma';

	export let data: PageData;
	$: ({ features } = data);
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
