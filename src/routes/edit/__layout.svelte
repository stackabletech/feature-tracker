<script context="module">
	import { guard } from '$lib/util/guard';

	export const load = async ({ fetch, session }) => {
		return guard(fetch, session, {});
	};
</script>

<script lang="ts">
	import Tabs from '$lib/components/tabs/Tabs.svelte';

	const tabs = [
		{
			name: 'Unified',
			url: '/edit/unified'
		},
		{
			name: 'Categories',
			url: '/edit/categories'
		},
		{
			name: 'Products',
			url: '/edit/products'
		},
		{
			name: 'Features',
			url: '/edit/features'
		},
		{
			name: 'Product Features',
			url: '/edit/product_features'
		}
	];
</script>

<Tabs {tabs} />
<div class="grow overflow-auto flex flex-col">
	<slot />
</div>
