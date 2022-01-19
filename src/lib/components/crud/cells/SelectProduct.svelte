<script lang="ts">
	import Select from './Select.svelte';
	export let value: string;
	export let colspan: number = 1;
	export let rowspan: number = 1;

	async function getProducts() {
		const res = await fetch('/api/products/minimal.json');
		const products = await res.json();
		return products.map(({ name, id }) => ({
			label: `${name} (#${id})`,
			value: id
		}));
	}

	let promise = getProducts();
</script>

{#await promise}
	<td {colspan} {rowspan}>{value}</td>
{:then options}
	<Select bind:value {options} optional />
{/await}
