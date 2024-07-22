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
    },
    {
      name: 'Releases',
      url: '/edit/releases'
    }
  ];
</script>

<Tabs {tabs} />
<div class="flex max-h-full grow flex-col overflow-auto">
  <slot />
</div>
