<script lang="ts">
	import Select from './Select.svelte';
	export let value;
	export let colspan: number = 1;
	export let rowspan: number = 1;

	async function getCategories() {
		const res = await fetch('/api/categories/minimal.json');
		const categories = await res.json();
		return categories.map(({ name, id }) => ({
			label: `${name} (#${id})`,
			value: id
		}));
	}

	let promise = getCategories();
</script>

{#await promise}
	<td {colspan} {rowspan}>{value}</td>
{:then options}
	<Select bind:value {options} optional {colspan} {rowspan} />
{/await}
