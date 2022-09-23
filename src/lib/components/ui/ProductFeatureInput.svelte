<script lang="ts">
	import { releases } from '$lib/stores';
	import { CheckIcon, XIcon } from 'svelte-feather-icons';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	const submit = () => {
		dispatch('submit', { status, release });
	};

	const cancel = () => {
		dispatch('cancel');
	};

	export let release = undefined;
	export let status = undefined;

	let globalShortcuts = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			submit();
			return;
		}

		if (e.key === 'Escape') {
			cancel();
		}
	};
</script>

<svelte:window on:keydown={globalShortcuts} />

<div class="form-control max-w-full">
	<label class="max-w-full m-1 flex items-center flex-row">
		<div class="tooltip" data-tip="Select Status">
			<select
				class="select select-xs select-bordered rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none"
				bind:value={status}
			>
				<option value={'NOT_PLANNED'} selected>Not Planned</option>
				<option value={'PLANNED'}>Planned</option>
				<option value={'IN_PROGRESS'}>In Progress</option>
				<option value={'COMPLETED'}>Completed</option>
				<option value={'NOT_AVAILABLE'}>Not Available</option>
			</select>
		</div>
		<div class="tooltip" data-tip="Select Release">
			<select class="select select-xs select-bordered rounded-none m-0" bind:value={release}>
				{#each $releases as release}
					<option value={release.id} selected>{release.name}</option>
				{/each}
			</select>
		</div>
		<div class="tooltip" data-tip="Submit">
			<button
				class="btn btn-square btn-outline btn-success btn-xs m-0 rounded-none"
				on:click={submit}
			>
				<CheckIcon size="16" />
			</button>
		</div>
		<div class="tooltip" data-tip="Cancel">
			<button
				class="btn btn-square btn-outline btn-error text-error-content btn-xs rounded-l-none m-0 rounded-r-md"
				on:click={cancel}
			>
				<XIcon size="16" />
			</button>
		</div>
	</label>
</div>
