<script lang="ts">
	import { CheckIcon, XIcon } from 'svelte-feather-icons';
	import { createEventDispatcher, onMount } from 'svelte';

	export let placeholder = 'Enter feature name';

	let dispatch = createEventDispatcher();
	let input: HTMLInputElement;

	onMount(() => input.focus());

	export let value: string = '';

	const submit = () => {
		input.blur();
		dispatch('submit', { value });
	};

	const cancel = () => {
		input.blur();
		dispatch('cancel');
	};

	const handle = (e: KeyboardEvent) => {
		if (value !== '' && e.key === 'Enter') {
			submit();
		} else if (e.key === 'Escape') {
			cancel();
		}
	};

	let active = false;
	$: disabled = value == undefined || value == '';
</script>

<div class="form-control max-w-full">
	<label class="input-group input-group-sm max-w-full m-1">
		<input
			bind:this={input}
			type="text"
			name="input"
			id="input"
			class="input input-bordered input-sm"
			{placeholder}
			on:focus={() => (active = true)}
			on:blur={() => (active = false)}
			on:keydown={handle}
			bind:value
		/>
		<button
			class="btn btn-square btn-outline btn-success btn-sm"
			class:btn-success={!disabled}
			{disabled}
			on:click={submit}
		>
			<CheckIcon size="16" />
		</button>
		<button
			class="btn btn-square btn-outline btn-error text-error-content btn-sm"
			on:click={cancel}
		>
			<XIcon size="16" />
		</button>
	</label>
	<label for="input" class="label">
		<span class="label-text-alt transition-all" class:opacity-0={disabled || !active}>
			<kbd class="kbd kbd-xs">enter</kbd> to accept <kbd class="kbd kbd-xs">esc</kbd> to cancel
		</span>
	</label>
</div>
