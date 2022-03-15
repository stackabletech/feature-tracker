<script lang="ts">
	import Tab from './Tab.svelte';
	export let tabs;
</script>

<nav class="tabs">
	<div class="w-4 cursor-default tab tab-bordered" />
	{#each tabs as { name, url }}
		<Tab {name} {url} />
	{/each}
	<div class="flex-1 cursor-default tab tab-bordered" />
</nav>
