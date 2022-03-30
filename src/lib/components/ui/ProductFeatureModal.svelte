<script>
	import Modal from './Modal.svelte';
	import ImplementationIcon from '$lib/components/ui/ImplementationIcon.svelte';

	import { InfoIcon } from 'svelte-feather-icons';

	export let product;
	export let feature;
	export let productFeature;
</script>

<Modal on:close>
	<svelte:fragment slot="title">
		<InfoIcon size="18" class="mr-2 my-auto" />
		<h3 class="font-bold my-auto">Implementation Details</h3>
	</svelte:fragment>
	<main class="flex flex-col">
		<div class="flex flex-row justify-between">
			<p>Product:</p>
			<p>{product.name}</p>
		</div>
		<div class="flex flex-row justify-between">
			<p>Feature:</p>
			<p>{feature.name}</p>
		</div>
		<div class="flex flex-row justify-between">
			<p>Status:</p>
			<p class="flex">
				<ImplementationIcon status={productFeature.implementation_status} class="m-auto mr-1" />
				{productFeature.implementation_status}
			</p>
		</div>
		<div class="flex flex-row justify-between">
			<p>Date:</p>
			<p>
				{new Date(productFeature?.implementation_date).toLocaleDateString(undefined, {
					month: 'short',
					year: 'numeric'
				})}
			</p>
		</div>
		{#if productFeature.implementation_version}
			<div class="flex flex-row justify-between">
				<p>Version:</p>
				<p>{productFeature.implementation_version}</p>
			</div>
		{/if}
		{#if productFeature.note}
			<div class="flex flex-row justify-between">
				<p>Note:</p>
				<p>{productFeature.note}</p>
			</div>
		{/if}
	</main>
</Modal>
