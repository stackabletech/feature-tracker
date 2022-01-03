<script context="module" lang="ts">
	export const load = async ({ page, fetch }) => {
		const response = await fetch(`/api/categories/${page.params.id}.json`);
		const category = await response.json();
		return { props: { category } };
	};
</script>

<script lang="ts">
	import type { Category } from '@prisma/client';
	import Code from '$lib/components/Code.svelte';
	export let category: Category;
</script>

<Code>
	<pre> {JSON.stringify(category, null, 2)} </pre>
</Code>
