<script lang="ts">
	import Select from './Select.svelte';
	import type { ImplementationStatus } from '$lib/prisma';

	export let value: ImplementationStatus;
	export let colspan: number = 1;
	export let rowspan: number = 1;

	const options = [
		{ value: 'NOT_PLANNED', label: 'Not Planned' },
		{ value: 'PLANNED', label: 'Planned' },
		{ value: 'IN_PROGRESS', label: 'In Progress' },
		{ value: 'COMPLETED', label: 'Completed' },
		{ value: 'NOT_AVAILABLE', label: 'Not Available' }
	];
</script>

<Select bind:value {options} {colspan} {rowspan} />
