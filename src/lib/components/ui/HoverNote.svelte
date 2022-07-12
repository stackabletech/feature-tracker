<script lang="ts">
	import { marked } from 'marked';
	export let note: string;
</script>

<div class="bg-base-200 base-content p-4 rounded-md whitespace-normal shadow-md">
	{@html marked.parse(note)}
</div>
