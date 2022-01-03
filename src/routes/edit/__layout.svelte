<script lang="ts">
	import Tabs from '$lib/components/tabs/Tabs.svelte';

	const tabs = [
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

<slot />
