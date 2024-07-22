<script lang="ts">
  import { features } from '$lib/stores';
  import Table from '$lib/components/crud/Table.svelte';
</script>

<Table bind:data={$features} endpoint="/api/features" />
