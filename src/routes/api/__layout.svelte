<script lang="ts">
	import Guard from '$lib/components/Guard.svelte';
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

<Guard>
	<div class="grow flex flex-col">
		<Tabs {tabs} />

		<slot />
	</div>
</Guard>
