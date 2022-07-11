<script lang="ts">
	import { marked } from 'marked';
	export let note: string;
</script>

<div
	class="absolute bg-base-200 base-content top-8 left-8 p-4 z-50 w-64 rounded-md whitespace-normal shadow-md"
>
	{@html marked.parse(note)}
</div>
