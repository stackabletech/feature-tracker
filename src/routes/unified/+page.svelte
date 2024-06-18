<script lang="ts">
  import ExpandAllButton from '$lib/components/ui/ExpandAllButton.svelte';
  import FilterableHeader from '$lib/components/unified/cells/FilterableHeader.svelte';
  import Product from '$lib/components/unified/cells/Product.svelte';
  import CategoryRow from '$lib/components/unified/table/CategoryRow.svelte';
  import Table from '$lib/components/unified/table/Table.svelte';
  import DisplayButton from '$lib/components/ui/DisplayButton.svelte';
  import DisplayModal from '$lib/components/ui/DisplayModal.svelte';

  import { writable } from 'svelte/store';
  import type { Writable } from 'svelte/store';
  import { setContext } from 'svelte';

  import {
    products,
    categories,
    features,
    filteredProducts,
    categoryTree,
    categoryFilter,
    productFilter
  } from '$lib/stores';

  let editable: Writable<boolean> = writable(false);

  let settingsModal: boolean = false;
  const showSettings = () => (settingsModal = true);
  const hideSettings = () => (settingsModal = false);

  setContext('editable', editable);

  let rows: CategoryRow[] = [];

  const expandAll = () => {
    rows.forEach((row) => row.expand());
  };

  const collapseAll = () => {
    rows.forEach((row) => row.collapse());
  };
</script>

<Table>
  <svelte:fragment slot="head">
    <tr>
      <th class="border-b-0 bg-base-100">
        <DisplayButton on:click={showSettings} />
        <ExpandAllButton on:click={expandAll} />
        <ExpandAllButton on:click={collapseAll} collapse />
      </th>
      <FilterableHeader
        bind:filter={$productFilter}
        sortable={{ Products: products }}
        class="rounded-tl-lg"
      >
        Products
      </FilterableHeader>
      <th colspan={$filteredProducts.length - 1} class="bg-base-300" />
    </tr>
    <tr>
      <!-- Feature Header -->
      <FilterableHeader
        bind:filter={$categoryFilter}
        sortable={{ Categories: categories, Features: features }}
        class="rounded-tl-lg"
      >
        Features
      </FilterableHeader>

      <!-- Product Values -->
      {#each $filteredProducts as product (product.id)}
        <Product {product} />
      {/each}
    </tr>
  </svelte:fragment>
  <svelte:fragment>
    {#each $categoryTree as category, i (category.id)}
      <CategoryRow {category} bind:this={rows[i]} />
    {/each}
  </svelte:fragment>
</Table>

{#if settingsModal}
  <DisplayModal on:close={hideSettings} />
{/if}
