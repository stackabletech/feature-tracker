<script lang="ts">
	export let value = undefined;
	let checked = !(value === null);

	export let rowspan: number = 1;
	export let colspan: number = 1;

	let date = new Date(value || Date.now());
	$: month = date.getMonth() + 1;
	$: year = date.getFullYear();

	$: inputValue = `${year}-${month}`;
	$: value = checked ? date.toISOString() : null;

	let updateValue = (d: number) => {
		date = new Date(date.setMonth(date.getMonth() + d));
	};

	let handleInput = (e: KeyboardEvent) => {
		if (e.key == 'Escape' || e.key == 'Tab') return;

		e.preventDefault();
		(e.key == 'ArrowUp' || e.key == 'ArrowRight') && updateValue(1);
		(e.key == 'ArrowDown' || e.key == 'ArrowLeft') && updateValue(-1);
	};
</script>

<td {colspan} {rowspan}>
	<div class="flex flex-row items-center justify-center">
		<div
			class="tooltip w-6 h-6 mr-2 z-10"
			data-tip={checked ? 'uncheck to remove date' : 'check to add date'}
		>
			<input type="checkbox" bind:checked class="checkbox" />
		</div>
		<div class="input-group">
			<button
				class="btn btn-ghost focus:btn-outline"
				on:click={() => updateValue(-1)}
				disabled={!checked}>-</button
			>
			<input
				type="text"
				class="input disabled:text-white disabled:text-opacity-20"
				bind:value={inputValue}
				on:keydown={handleInput}
				disabled={!checked}
			/>
			<button
				class="btn btn-ghost focus:btn-outline"
				on:click={() => updateValue(1)}
				disabled={!checked}>+</button
			>
		</div>
	</div>
</td>
