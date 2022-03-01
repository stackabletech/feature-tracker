<script lang="ts">
	export let filename: string = '';
</script>

<main class="p-8">
	{#if filename}
		<pre>{filename}</pre>
	{/if}
	<div class="p-8 rounded-xl bg-base-300 text-sm">
		<slot />
	</div>
</main>
