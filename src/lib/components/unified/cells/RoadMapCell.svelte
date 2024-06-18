<script lang="ts">
  import { features, featuresWithParents, products } from '$lib/stores';
  import ProductFeatureModal from '$lib/components/ui/ProductFeatureModal.svelte';
  import type { ProductFeature, Feature, Product, Release } from '@prisma/client';

  export let productFeature: ProductFeature;
  export let release: Release;

  let feature: Feature | undefined = $features.find(
    (feature) => feature.id === productFeature.feature_id
  );
  let product: Product | undefined = $products.find(
    (product) => product.id === productFeature.product_id
  );

  let modal: boolean = false;
  let showInfo = () => {
    modal = true;
  };
  let hideInfo = () => {
    modal = false;
  };

  $: path = feature
    ? $featuresWithParents.find((c) => c.id === feature.id)?.parents.join(' > ')
    : undefined;

  import ImplementationIcon from '$lib/components/ui/ImplementationIcon.svelte';
</script>

{#if feature && product}
  <div
    class="tooltip cursor-pointer"
    data-tip={path ? path + ' > ' + feature.name : feature.name}
    on:click={showInfo}
  >
    <ImplementationIcon
      status={productFeature.implementation_status}
      released={release.released}
      class="mx-1 my-auto"
    />
  </div>

  {#if modal}
    <ProductFeatureModal {product} {feature} {productFeature} on:close={hideInfo} />
  {/if}
{/if}
