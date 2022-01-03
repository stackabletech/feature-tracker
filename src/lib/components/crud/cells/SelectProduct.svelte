<script lang="ts">
	import Select from './Select.svelte';
	export let value;

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
	<td>{value}</td>
{:then options}
	<Select bind:value {options} optional />
{/await}
