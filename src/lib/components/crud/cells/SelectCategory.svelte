<script lang="ts">
	import { categoriesWithParents } from '$lib/stores';
	import Option from '$lib/components/crud/cells/Option.svelte';
	import { ChevronDownIcon } from 'svelte-feather-icons';
	import { derived } from 'svelte/store';

	export let value: any = undefined;
	export let colspan: number;
	export let rowspan: number;
	export let optional = false;

	let input: HTMLInputElement;
	let filter = '';
	$: filteredCategoriesWithParents = derived(categoriesWithParents, ($) => {
		return $.filter((category) => {
			return category.name.toLowerCase().includes(filter.toLowerCase());
		});
	});
	$: path = $categoriesWithParents.find((c) => c.id === value)?.parents.join(' > ') ?? undefined;

	let title = $categoriesWithParents.find((c) => c.id === value)?.name ?? 'Select Category';

	let menu: HTMLElement;

	let select = (e: CustomEvent) => {
		title = e.detail.label;
		value = e.detail.value;
		cancel();
	};

	const cancel = () => {
		filter = '';
		input.blur();
		menu.blur();
	};
</script>

<td {colspan} {rowspan}>
	<div class={path && 'tooltip'} data-tip={path}>
		<div class="dropdown">
			<div
				tabindex="0"
				class="btn btn-ghost border border-base-300 bg-base-100 flex flex-row justify-between m-1 min-w-[16rem] flex-nowrap group"
				on:click={() => input.focus()}
			>
				<span>
					{#if value}<span class="text-primary">#{value}:</span>{/if}
					{title}
					<input
						type="text"
						class="opacity-0 w-0 h-0"
						bind:value={filter}
						bind:this={input}
						on:keydown={(e) => {
							e.key === 'Escape' && cancel();
						}}
						autocomplete="off"
					/>
				</span>
				<ChevronDownIcon class="group-focus-within:rotate-180 transition-all" size="16" />
			</div>
			<ul
				tabindex="0"
				class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96"
				bind:this={menu}
			>
				<span class="text-center text-primary">
					{filter === '' ? 'start typing to filter' : filter}
				</span>
				{#if optional}
					<Option value={null} prefix="" label="No Category" on:select={(e) => select(e)} />
				{/if}
				{#each $filteredCategoriesWithParents as { id, name, parents } (id)}
					<Option value={id} prefix="#{id}" label={name} {parents} on:select={(e) => select(e)} />
				{/each}
			</ul>
		</div>
	</div>
</td>
