<script lang="ts">
	const options = [
		{ value: 'NOT_PLANNED', label: 'Not Planned' },
		{ value: 'PLANNED', label: 'Planned' },
		{ value: 'IN_PROGRESS', label: 'In Progress' },
		{ value: 'COMPLETED', label: 'Completed' },
		{ value: 'NOT_AVAILABLE', label: 'Not Available' }
	];

	import Option from '$lib/components/crud/cells/Option.svelte';
	import type { ImplementationStatus } from '@prisma/client';
	import { ChevronDownIcon } from 'svelte-feather-icons';

	export let value: ImplementationStatus = undefined;
	export let colspan: number;
	export let rowspan: number;
	export let optional = false;

	let title = options.find((c) => c.value === value)?.label ?? 'Select Implementation Status';
	let menu: HTMLElement;

	let select = (e: CustomEvent) => {
		title = e.detail.label;
		value = e.detail.value;
		console.log('selected', value);
		menu.blur();
	};
</script>

<td {colspan} {rowspan}>
	<div class="dropdown">
		<div
			tabindex="0"
			class="btn btn-ghost border border-base-300 bg-base-100 flex flex-row justify-between m-1 min-w-[16rem] flex-nowrap group"
		>
			<span>
				{title}
			</span>
			<ChevronDownIcon class="group-focus-within:rotate-180 transition-all" size="16" />
		</div>
		<ul
			tabindex="0"
			class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96"
			bind:this={menu}
		>
			{#if optional}
				<Option
					value={null}
					prefix=""
					label="No Implementation Status"
					on:select={(e) => select(e)}
				/>
			{/if}
			{#each options as { value, label }}
				<Option {value} {label} on:select={(e) => select(e)} />
			{/each}
		</ul>
	</div>
</td>
