<script lang="ts">
	import type { ProductFeature } from '@prisma/client';
	export let productFeature: ProductFeature;
</script>

<td class="w-48">
	{productFeature.implementation_status}
</td>
