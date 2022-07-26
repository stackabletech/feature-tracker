<script lang="ts">
	import { CheckIcon, MinusIcon, PlusIcon, XIcon } from 'svelte-feather-icons';
	import { createEventDispatcher, onMount } from 'svelte';

	let dispatch = createEventDispatcher();

	const submit = () => {
		dispatch('submit', { status, date: value });
	};

	const cancel = () => {
		dispatch('cancel');
	};

	export let value = undefined;
	export let status = undefined;
	export let input: HTMLElement = undefined;

	let now = new Date(Date.now());
	let date = value ? new Date(value) : new Date(now.getUTCFullYear(), now.getUTCMonth(), 1);
	$: console.log(date);
	value = date.toISOString();

	$: month = date.getMonth() + 1;
	$: year = date.getFullYear();

	$: inputValue = `${year}-${month}`;

	let updateValue = (d: number) => {
		date = new Date(date.setMonth(date.getMonth() + d));
		value = date.toISOString();
	};

	let globalShortcuts = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			submit();
			return;
		}

		if (e.key === 'Escape') {
			cancel();
		}
	};

	let handle = (e: KeyboardEvent) => {
		if (e.key == 'Tab') return;

		e.preventDefault();
		(e.key == 'ArrowUp' || e.key == 'ArrowRight') && updateValue(1);
		(e.key == 'ArrowDown' || e.key == 'ArrowLeft') && updateValue(-1);
	};

	onMount(() => input.focus());
</script>

<svelte:window on:keydown={globalShortcuts} />

<div class="form-control max-w-full">
	<label class="input-group input-group-sm max-w-full m-1">
		<select class="select select-xs select-bordered" bind:value={status}>
			<option value={'NOT_PLANNED'} selected>Not Planned</option>
			<option value={'PLANNED'}>Planned</option>
			<option value={'IN_PROGRESS'}>In Progress</option>
			<option value={'COMPLETED'}>Completed</option>
			<option value={'NOT_AVAILABLE'}>Not Available</option>
		</select>
		<button class="btn btn-square btn-outline btn-xs" on:click={() => updateValue(-1)}>
			<MinusIcon size="16" />
		</button>
		<input
			type="text"
			class="input input-bordered input-xs w-20 text-center"
			placeholder="2022-01"
			bind:this={input}
			bind:value={inputValue}
			on:keydown={handle}
		/>
		<button class="btn btn-square btn-outline btn-xs" on:click={() => updateValue(+1)}>
			<PlusIcon size="16" />
		</button>
		<button class="btn btn-square btn-outline btn-success btn-xs" on:click={submit}>
			<CheckIcon size="16" />
		</button>
		<button
			class="btn btn-square btn-outline btn-error text-error-content btn-xs"
			on:click={cancel}
		>
			<XIcon size="16" />
		</button>
	</label>
</div>
