<script lang="ts">
	import Code from '$lib/components/Code.svelte';

	// FIXME check this import / generated types
	import type { PageData } from './$types';
	import type { Feature } from '$lib/prisma';

	export let data: PageData;
	$: ({ feature } = data);
</script>

<Code>
	<pre> {JSON.stringify(feature, null, 2)} </pre>
</Code>
