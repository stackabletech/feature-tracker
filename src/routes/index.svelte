<script lang="ts">
	import { categories, products, features, productFeatures } from '$lib/stores.ts';
	import { info } from '$lib/util/alert';
</script>

<main class="grow grid place-items-center bg-launch bg-no-repeat bg-bottom">
	<div class="text-center">
		<p on:click={() => info('Hello, World!')}>Hello World.</p>
		<p>
			Currently {$features.length} features in {$categories.length} categories combine with {$products.length}
			products into {$productFeatures.length} product-features!
		</p>
	</div>
</main>
