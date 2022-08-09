<script lang="ts">
	import Text from './Text.svelte';
	import TextArea from './TextArea.svelte';
	import Date from './Date.svelte';
	import SelectImplementationStatus from './SelectImplementationStatus.svelte';
	import SelectCategory from './SelectCategory.svelte';
	import SelectProduct from './SelectProduct.svelte';
	import SelectFeature from './SelectFeature.svelte';

	export let value: any;
	export let type: string;

	export let colspan = 1;
	export let rowspan = 1;
</script>

{#if type === 'id'}
	<td class="text-base-300">#{value}</td>
{:else if type === 'category_id'}
	<SelectCategory bind:value {colspan} {rowspan} />
{:else if type === 'parent_id'}
	<SelectCategory bind:value {colspan} {rowspan} optional />
{:else if type === 'product_id'}
	<SelectProduct bind:value {colspan} {rowspan} />
{:else if type === 'feature_id'}
	<SelectFeature bind:value {colspan} {rowspan} />
{:else if type === 'implementation_status'}
	<SelectImplementationStatus bind:value {colspan} {rowspan} />
{:else if type === 'implementation_date'}
	<Date bind:value {colspan} {rowspan} />
{:else if type === 'name' || type === 'implementation_version'}
	<Text bind:value {colspan} {rowspan} />
{:else if type.toLowerCase() === 'note'}
	<TextArea bind:value {colspan} {rowspan} />
{:else}
	<td class="text-base-300">not implemented</td>
{/if}
