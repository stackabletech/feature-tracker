<script lang="ts">
	import { marked } from 'marked';
	import { fade } from 'svelte/transition';

	export let note: string = undefined;
</script>

<div
	class="bg-base-200 base-content p-4 prose prose-h1:text-lg prose-h2:text-sm text-sm rounded-md whitespace-normal shadow-md"
	transition:fade={{ duration: 200 }}
>
	{#if $$slots.pre}
		<div class="text-base-content text-sm text-opacity-50">
			<slot name="pre" />
		</div>
	{/if}
	{#if note}
		{@html marked(note)}
	{/if}
</div>
