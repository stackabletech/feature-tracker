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
    },
    {
      name: 'Releases',
      url: '/api/releases'
    }
  ];
</script>

<div class="flex grow flex-col">
  <Tabs {tabs} />

  <slot />
</div>
