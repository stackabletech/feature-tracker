<script lang="ts">
  import { productFeatures } from '$lib/stores';
  import Table from '$lib/components/crud/Table.svelte';
</script>

<Table bind:data={$productFeatures} endpoint="/api/product_features" />
