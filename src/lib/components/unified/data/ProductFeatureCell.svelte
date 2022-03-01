<script lang="ts">
	import type { ProductFeature } from '@prisma/client';
	export let productFeature: ProductFeature;
</script>

<td>
	{productFeature.implementation_status}
</td>
