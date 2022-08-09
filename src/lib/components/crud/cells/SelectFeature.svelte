<script lang="ts">
	import { featuresWithParents } from '$lib/stores';
	import Option from '$lib/components/crud/cells/Option.svelte';
	import { ChevronDownIcon } from 'svelte-feather-icons';

	export let value: any = undefined;
	export let colspan: number;
	export let rowspan: number;
	export let optional = false;

	let title = $featuresWithParents.find((c) => c.id === value)?.name ?? 'Select Feature';
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
			class="btn btn-ghost border border-base-300 bg-base-100 flex flex-row justify-between m-1 w-64 group"
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
				<Option value={undefined} prefix="" label="No Feature" on:select={(e) => select(e)} />
			{/if}
			{#each $featuresWithParents as { id, name, parents }}
				<Option value={id} prefix="#{id}" label={name} {parents} on:select={(e) => select(e)} />
			{/each}
		</ul>
	</div>
</td>
