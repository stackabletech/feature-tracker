<script lang="ts">
	// FIXME check this import / generated types
	import type { PageData } from './$types';
	import type { ProductFeature } from '$lib/prisma';
	import Code from '$lib/components/Code.svelte';

	export let data: PageData;
	$: ({ product_feature } = data);
</script>

<Code>
	<pre> {JSON.stringify(product_feature, null, 2)} </pre>
</Code>
