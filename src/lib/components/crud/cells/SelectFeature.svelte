<script lang="ts">
	import Select from './Select.svelte';
	export let value;

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
	<td>{value}</td>
{:then options}
	<Select bind:value {options} optional />
{/await}
