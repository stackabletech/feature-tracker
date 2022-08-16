<script lang="ts">
	import type { PageData } from './$types';
	import Code from '$lib/components/Code.svelte';

	export let data: PageData;
	$: ({ category } = data);
</script>

<Code>
	<pre> {JSON.stringify(category, null, 2)} </pre>
</Code>
