<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { HierarchicalCategory } from '$lib/stores';
  import { getContext } from 'svelte';
  import { filteredFeatures, filteredProducts } from '$lib/stores';

  import FeatureRow from './FeatureRow.svelte';
  import Category from '../cells/Category.svelte';

  export let level: number = 0;
  export let expanded: boolean = false;
  export let expandAll: boolean = false;

  export const expand = () => {
    expanded = true;
    expandAll = true;
  };

  export const collapse = () => {
    expanded = false;
    expandAll = false;
  };

  export let category: HierarchicalCategory;
  $: categoryFeatures = $filteredFeatures.filter((f) => f.category_id === category.id);

  let editable: Writable<boolean> = getContext('editable');
</script>

<tr class="category hover bg-base-200">
  <!-- First Column: Category Name -->
  <Category {category} bind:expanded {level} />
  <!-- Rest Columns: ProductFeature Cells -->
  <td colspan={$filteredProducts.length} />
</tr>

{#if expanded}
  {#each categoryFeatures as feature (feature.id)}
    <FeatureRow {category} {feature} />
  {/each}
  {#if $editable}
    <FeatureRow {category} />
  {/if}

  {#each category.children ?? [] as child (child.id)}
    <svelte:self category={child} level={level + 1} expanded={expandAll} {expandAll} />
  {/each}
{/if}
