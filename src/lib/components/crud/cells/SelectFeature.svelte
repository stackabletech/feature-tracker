<script lang="ts">
	import Select from './Select.svelte';
	export let value: number | string;
	export let colspan: number = 1;
	export let rowspan: number = 1;

	async function getFeatures() {
		const res = await fetch('/api/features/minimal.json');
		const features = await res.json();
		return features.map(({ name, id }) => ({
			label: `${name} (#${id})`,
			value: id
		}));
	}

	let promise = getFeatures();
</script>

{#await promise}
	<td {colspan} {rowspan}>{value}</td>
{:then options}
	<Select bind:value {options} optional {colspan} {rowspan} />
{/await}
