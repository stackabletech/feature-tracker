<script lang="ts">
	import { marked } from 'marked';
	import { fade } from 'svelte/transition';
	export let note: string;
</script>

<div
	class="bg-base-200 base-content p-4 prose prose-h1:text-lg prose-h2:text-sm rounded-md whitespace-normal shadow-md"
	transition:fade={{ duration: 200 }}
>
	{@html marked.parse(note)}
</div>
