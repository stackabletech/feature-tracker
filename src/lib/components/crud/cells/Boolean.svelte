<script lang="ts">
	export let rowspan: number = 1;
	export let colspan: number = 1;

	export let value = false;
	export let labelFalse = 'False';
	export let labelTrue = 'True';
</script>

<td {colspan} {rowspan}>
	<div class="flex flex-row items-center justify-center">
		<div class="tooltip w-6 h-6 mr-2" data-tip={value ? labelTrue : labelFalse}>
			<input type="checkbox" bind:checked={value} class="checkbox" />
		</div>
	</div>
</td>
