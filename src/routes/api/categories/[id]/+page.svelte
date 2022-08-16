<script lang="ts">
	// FIXME check this import / generated types
	import type { PageData } from './$types';
	import type { Category } from '$lib/prisma';

	import Code from '$lib/components/Code.svelte';

	export let data: PageData;
	$: ({ category } = data);
</script>

<Code>
	<pre> {JSON.stringify(category, null, 2)} </pre>
</Code>
