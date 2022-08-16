<script lang="ts">
	// FIXME check this import / generated types
	import type { PageData } from './$types';
	import type { Product } from '$lib/prisma';
	import Code from '$lib/components/Code.svelte';

	export let data: PageData;
	$: ({ product } = data);
</script>

<Code>
	<pre> {JSON.stringify(product, null, 2)} </pre>
</Code>
