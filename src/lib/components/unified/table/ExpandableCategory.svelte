<script lang="ts">
	import type { HierarchicalCategory } from '$lib/stores';
	import { features } from '$lib/stores';

	import Row from './Row.svelte';

	export let level: number = 0;
	export let expanded: boolean = false;
	export let forcedOpen: boolean;

	export let category: HierarchicalCategory;
	$: categoryFeatures = $features.filter((f) => f.category_id === category.id);

	export const toggle = () => (expanded = !expanded);
</script>

{#each categoryFeatures as feature, n}
	<Row showCategory={n === 0} {level} {category} {feature} bind:expanded {forcedOpen} />
{:else}
	<Row {level} {category} bind:expanded {forcedOpen} />
{/each}

{#if category.children && (expanded || forcedOpen)}
	{#each category.children as child}
		<svelte:self category={child} level={level + 1} {forcedOpen} />
	{/each}
{/if}
