<script lang="ts">
	import Guard from '$lib/components/Guard.svelte';
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

<Guard>
	<Tabs {tabs} />
	<slot />
</Guard>
