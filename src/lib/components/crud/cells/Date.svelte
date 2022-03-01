<script lang="ts">
	export let value: string;
	export let rowspan: number = 1;
	export let colspan: number = 1;

	let date = new Date(value || Date.now());
	$: month = date.getMonth() + 1;
	$: year = date.getFullYear();

	$: inputValue = `${year}-${month}`;

	let updateValue = (d: number) => {
		date = new Date(date.setMonth(date.getMonth() + d));
		value = date.toISOString();
	};

	let handleInput = (e: KeyboardEvent) => {
		if (e.key == 'Escape' || e.key == 'Tab') return;

		e.preventDefault();
		(e.key == 'ArrowUp' || e.key == 'ArrowRight') && updateValue(1);
		(e.key == 'ArrowDown' || e.key == 'ArrowLeft') && updateValue(-1);
	};
</script>

<td {colspan} {rowspan}>
	<button class="btn btn-ghost focus:btn-outline" on:click={() => updateValue(-1)}>-</button>
	<input type="text" class="input" bind:value={inputValue} on:keydown={handleInput} />
	<button class="btn btn-ghost focus:btn-outline" on:click={() => updateValue(1)}>+</button>
</td>
