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
			name: 'Categories',
			url: '/api/categories'
		},
		{
			name: 'Products',
			url: '/api/products'
		},
		{
			name: 'Features',
			url: '/api/features'
		},
		{
			name: 'Product Features',
			url: '/api/product_features'
		}
	];
</script>

<div class="grow flex flex-col">
	<Tabs {tabs} />

	<slot />
</div>
