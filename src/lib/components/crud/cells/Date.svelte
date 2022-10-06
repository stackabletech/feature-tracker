<script lang="ts">
	export let optional = true;

	export let value = undefined;
	let checked = optional ? !(value === null) : true;

	export let rowspan: number = 1;
	export let colspan: number = 1;

	let date = new Date(value || Date.now()).toISOString().split('T')[0];

	$: value = checked ? new Date(date).toISOString() : null;
</script>

<td {colspan} {rowspan}>
	<div class="flex flex-row items-center justify-center">
		{#if optional}
			<div
				class="tooltip w-6 h-6 mr-2"
				data-tip={checked ? 'uncheck to remove date' : 'check to add date'}
			>
				<input type="checkbox" bind:checked class="checkbox" />
			</div>
		{/if}
		<input
			type="date"
			class="input disabled:text-white disabled:text-opacity-20"
			bind:value={date}
			disabled={!checked}
		/>
	</div>
</td>
