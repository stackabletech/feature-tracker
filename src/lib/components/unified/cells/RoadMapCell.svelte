<script lang="ts">
	import { features, products } from '$lib/stores';
	import ProductFeatureModal from '$lib/components/ui/ProductFeatureModal.svelte';
	import type { ProductFeature, Feature, Product } from '@prisma/client';

	export let productFeature: ProductFeature;
	let feature: Feature = $features.find((feature) => feature.id === productFeature.feature_id);
	let product: Product = $products.find((product) => product.id === productFeature.product_id);

	let modal: boolean = false;
	let showInfo = () => {
		modal = true;
	};
	let hideInfo = () => {
		modal = false;
	};

	import ImplementationIcon from '$lib/components/ui/ImplementationIcon.svelte';
</script>

<div class="tooltip cursor-pointer" data-tip={feature.name} on:click={showInfo}>
	<ImplementationIcon status={productFeature.implementation_status} class="mx-1 my-auto" />
</div>

{#if modal}
	<ProductFeatureModal {product} {feature} {productFeature} on:close={hideInfo} />
{/if}
