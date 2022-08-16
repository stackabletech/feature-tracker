<script lang="ts">
	import { categories } from '$lib/stores';
	import Table from '$lib/components/crud/Table.svelte';
</script>

<Table bind:data={$categories} endpoint="/api/categories" />
