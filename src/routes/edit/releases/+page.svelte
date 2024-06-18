<script lang="ts">
  import { releases } from '$lib/stores';
  import Table from '$lib/components/crud/Table.svelte';
</script>

<Table bind:data={$releases} endpoint="/api/releases" />
