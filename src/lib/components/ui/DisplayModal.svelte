<script>
	import Modal from './Modal.svelte';

	import {
		showUnusedCategories,
		showUnusedFeatures,
		showUnusedProducts,
		showUnreleasedProductFeatures
	} from '$lib/stores';
</script>

<Modal on:close>
	<h2 class="card-title" slot="title">Display Settings:</h2>
	<label class="label cursor-pointer">
		<input type="checkbox" bind:checked={$showUnusedCategories} class="toggle" />
		<span class="label-text"> Show empty categories </span>
	</label>

	<label class="label cursor-pointer">
		<input type="checkbox" bind:checked={$showUnusedFeatures} class="toggle" />
		<span class="label-text"> Show empty features </span>
	</label>

	<label class="label cursor-pointer">
		<input type="checkbox" bind:checked={$showUnusedProducts} class="toggle" />
		<span class="label-text"> Show empty products </span>
	</label>

	<label class="label cursor-pointer">
		<input type="checkbox" bind:checked={$showUnreleasedProductFeatures} class="toggle" />
		<span class="label-text"> Show unreleased product features. </span>
	</label>
</Modal>
