<script lang="ts">
	import TextInput from './TextInput.svelte';
	import {
		XIcon,
		MoreHorizontalIcon,
		ArrowRightIcon,
		EditIcon,
		XSquareIcon
	} from 'svelte-feather-icons';

	export let value: string = '';
	export let scope: string;

	let editMode = false;
	let menuVisible = false;

	const activate = () => (editMode = true);
	const submit = (e: CustomEvent) => {
		value = e.detail.value;
		editMode = false;
	};

	const cancel = (e: Event) => (editMode = false);
</script>

<th class="group" {scope}>
	{#if editMode}
		<TextInput {value} on:submit={submit} on:cancel={cancel} />
	{:else if menuVisible}
		<div class="w-48 flex flex-row justify-between items-center">
			<div />
			<div class="my-auto">
				<div class="tooltip tooltip-bottom" data-tip="add sibling">
					<button class="btn btn-outline btn-xs">
						<ArrowRightIcon size="12" />
					</button>
				</div>
				<div class="tooltip tooltip-bottom" data-tip="edit details">
					<button class="btn btn-outline btn-xs">
						<EditIcon size="12" />
					</button>
				</div>
				<div class="tooltip tooltip-bottom" data-tip="delete category">
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
		<div class="w-48 flex flex-row justify-between items-center">
			<span on:click={activate} class="cursor-cell">{value}</span>
			<button
				class="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100"
				on:click={() => (menuVisible = !menuVisible)}
			>
				<MoreHorizontalIcon size="16" />
			</button>
		</div>
	{/if}
</th>
