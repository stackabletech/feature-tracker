<script lang="ts">
  import type { HierarchicalCategory } from '$lib/stores';
  import type { Product, Feature as FeatureType } from '$lib/prisma';
  import Feature from '../cells/Feature.svelte';
  import ProductFeature from '$lib/components/unified/cells/ProductFeature.svelte';
  import { filteredProducts, productFeatures } from '$lib/stores';

  export let category: HierarchicalCategory;
  export let feature: FeatureType | undefined = undefined;

  const getProductFeature = (p: Product, f?: FeatureType) => {
    return $productFeatures.find((pf) => pf.product_id == p?.id && pf.feature_id == f?.id);
  };
</script>

<tr class="hover">
  <!-- First Column: Feature Header -->
  <Feature {feature} {category} />
  <!-- Rest Columns: ProductFeature Cells -->
  {#each $filteredProducts as product (product.id)}
    <ProductFeature productFeature={getProductFeature(product, feature)} {product} {feature} />
  {/each}
</tr>
