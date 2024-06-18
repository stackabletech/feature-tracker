<script lang="ts">
  import type { HierarchicalCategory } from '$lib/stores';
  import { filteredFeatures } from '$lib/stores';

  import Row from './Row.svelte';

  export let level: number = 0;
  export let expanded: boolean = false;
  export let forcedOpen: boolean;

  export let category: HierarchicalCategory;
  $: categoryFeatures = $filteredFeatures.filter((f) => f.category_id === category.id);
</script>

{#each categoryFeatures as feature, n}
  <Row showCategory={n === 0} {level} {category} {feature} bind:expanded />
{:else}
  <Row {level} {category} bind:expanded />
{/each}

{#if category.children && (expanded || forcedOpen)}
  {#each category.children as child}
    <svelte:self category={child} level={level + 1} {forcedOpen} />
  {/each}
{/if}
