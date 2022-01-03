<script lang="ts">
	import Select from './Select.svelte';

	export let value;

	const options = [
		{ value: 'NOT PLANNED', label: 'Not Planned' },
		{ value: 'PLANNED', label: 'Planned' },
		{ value: 'IN_PROGRESS', label: 'In Progress' },
		{ value: 'COMPLETED', label: 'Completed' }
	];
</script>

<Select bind:value {options} />
