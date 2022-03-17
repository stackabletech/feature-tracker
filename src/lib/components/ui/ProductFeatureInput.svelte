<script lang="ts">
	import { CheckIcon, MinusIcon, PlusIcon, XIcon } from 'svelte-feather-icons';
	import { createEventDispatcher } from 'svelte';
	import { ImplementationStatus } from '@prisma/client';

	let dispatch = createEventDispatcher();

	const submit = () => {
		dispatch('submit', { status, date: value });
	};

	const cancel = () => {
		dispatch('cancel');
	};

	let value;
	let status;

	let date = new Date(value || Date.now());
	$: month = date.getMonth() + 1;
	$: year = date.getFullYear();

	$: inputValue = `${year}-${month}`;

	let updateValue = (d: number) => {
		date = new Date(date.setMonth(date.getMonth() + d));
		value = date.toISOString();
	};

	let handle = (e: KeyboardEvent) => {
		if (e.key == 'Tab') return;

		if (e.key === 'Enter') {
			submit();
			return;
		}

		if (e.key == 'Escape') {
			cancel();
			return;
		}

		e.preventDefault();
		(e.key == 'ArrowUp' || e.key == 'ArrowRight') && updateValue(1);
		(e.key == 'ArrowDown' || e.key == 'ArrowLeft') && updateValue(-1);
	};
</script>

<div class="form-control max-w-full">
	<label class="input-group input-group-sm max-w-full m-1">
		<select class="select select-xs select-bordered" bind:value={status}>
			<option value={ImplementationStatus.NOT_PLANNED}>Not Planned</option>
			<option value={ImplementationStatus.PLANNED}>Planned</option>
			<option value={ImplementationStatus.IN_PROGRESS}>In Progress</option>
			<option value={ImplementationStatus.COMPLETED}>Completed</option>
		</select>
		<button class="btn btn-square btn-outline btn-xs" on:click={() => updateValue(-1)}>
			<MinusIcon size="16" />
		</button>
		<input
			type="text"
			class="input input-bordered input-xs w-20 text-center"
			placeholder="2022-01"
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
