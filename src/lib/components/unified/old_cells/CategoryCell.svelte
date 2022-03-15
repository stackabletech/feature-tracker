<script lang="ts">
	import type { HierarchicalCategory } from '$lib/stores';

	import {
		ArrowDownIcon,
		CornerDownRightIcon,
		ChevronRightIcon,
		EditIcon,
		XSquareIcon,
		MinusIcon,
		MoreHorizontalIcon,
		XIcon
	} from 'svelte-feather-icons';

	import TextInput from '../../ui/TextInput.svelte';

	let editMode: boolean = false;
	let menuVisible: boolean = false;

	export let category: HierarchicalCategory;
	export let level: number = 0;
	export let active: boolean = false;
	export let forcedOpen: boolean = false;

	$: ml = 12 * level + 'px';
	$: hasChildren = category.children.length > 0;

	const submit = (e: CustomEvent) => {
		category.name = e.detail.value;
		editMode = false;
	};

	const cancel = (e: Event) => (editMode = false);
	const toggle = () => (active = !active);
</script>

<th class="group w-48" scope="row">
	{#if editMode}
		<TextInput on:submit={submit} on:cancel={cancel} value={category.name} />
	{:else if menuVisible}
		<div class="flex flex-row justify-between items-center">
			<MinusIcon size="16" class="opacity-20 m-2" />
			<div>
				<div class="tooltip" data-tip="add sibling">
					<button class="btn btn-outline btn-xs">
						<ArrowDownIcon size="12" />
					</button>
				</div>
				<div class="tooltip" data-tip="add child">
					<button class="btn btn-outline btn-xs">
						<CornerDownRightIcon size="12" />
					</button>
				</div>
				<div class="tooltip" data-tip="edit details">
					<button class="btn btn-outline btn-xs">
						<EditIcon size="12" />
					</button>
				</div>
				<div class="tooltip" data-tip="delete category">
					<button class="btn btn-outline btn-error btn-xs">
						<XSquareIcon size="12" />
					</button>
				</div>
			</div>
			<button class="btn btn-ghost btn-sm btn-circle" on:click={() => (menuVisible = !menuVisible)}>
				<XIcon size="16" />
			</button>
		</div>
	{:else}
		<div class="flex flex-row justify-between items-center" style:margin-left={ml}>
			{#if hasChildren}
				<button class="btn btn-ghost btn-sm btn-circle" disabled={forcedOpen} on:click={toggle}>
					<ChevronRightIcon
						size="16"
						class="transition-all {active || forcedOpen ? 'rotate-90' : ''}"
					/>
				</button>
			{:else}
				<MinusIcon size="16" class="m-2 opacity-20" />
			{/if}
			<div class="tooltip" data-tip="id: #{category.id}">
				<span on:click={() => (editMode = true)} class="cursor-cell">{category.name}</span>
			</div>
			<button
				class="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100"
				on:click={() => (menuVisible = !menuVisible)}
			>
				<MoreHorizontalIcon size="16" />
			</button>
		</div>
	{/if}
</th>
