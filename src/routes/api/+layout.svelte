<script lang="ts">
  import Tabs from '$lib/components/tabs/Tabs.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

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

<div>
  <Tabs {tabs} />

  {@render children()}
</div>
