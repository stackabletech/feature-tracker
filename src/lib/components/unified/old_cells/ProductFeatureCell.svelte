<script lang="ts">
	import type { ProductFeature } from '$lib/prisma';
	export let productFeature: ProductFeature;
</script>

<td class="w-48">
	{productFeature.implementation_status}
</td>
