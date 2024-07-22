<script lang="ts">
  import { products } from '$lib/stores';
  import Table from '$lib/components/crud/Table.svelte';
</script>

<Table bind:data={$products} endpoint="/api/products" />
