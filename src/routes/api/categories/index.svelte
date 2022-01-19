<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const response = await fetch('/api/categories.json');
		const categories = await response.json();
		return { props: { categories } };
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Code from '$lib/components/Code.svelte';
	import type { Category } from '@prisma/client';
	export let categories: Category[];
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
