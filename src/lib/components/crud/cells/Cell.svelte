<script lang="ts">
	import Text from './Text.svelte';
	import Date from './Date.svelte';
	import SelectImplementationStatus from './SelectImplementationStatus.svelte';
	import SelectCategory from './SelectCategory.svelte';
	import SelectProduct from './SelectProduct.svelte';
	import SelectFeature from './SelectFeature.svelte';

	export let value;
	export let type;
</script>

{#if type === 'id'}
	<td class="text-gray-300">#{value}</td>
{:else if type === 'category_id' || type === 'parent_id'}
	<SelectCategory bind:value />
{:else if type === 'product_id'}
	<SelectProduct bind:value />
{:else if type === 'feature_id'}
	<SelectFeature bind:value />
{:else if type === 'implementation_status'}
	<SelectImplementationStatus bind:value />
{:else if type === 'implementation_date'}
	<Date bind:value />
{:else if type === 'name' || type === 'implementation_version' || type === 'note'}
	<Text bind:value />
{:else}
	<td class="text-gray-300">not implemented</td>
{/if}
