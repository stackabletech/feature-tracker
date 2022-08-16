<script lang="ts">
	import { goto } from '$app/navigation';
	import Code from '$lib/components/Code.svelte';

	// FIXME check this import / generated types
	import type { PageData } from './$types';
	import type { Category } from '$lib/prisma';

	export let data: PageData;
	$: ({ categories } = data);
</script>

<Code filename="/api/categories.json">
	<pre>[</pre>
	{#each categories as category}
		<pre class="cursor-pointer" on:click={() => goto(`categories/${category.id}`)}>
			{JSON.stringify(category, null, 2)},
		</pre>
	{/each}
	<pre>]</pre>
</Code>
