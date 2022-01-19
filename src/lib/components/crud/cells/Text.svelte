<script lang="ts">
	export let value: string;
	export let colspan: number = 1;
	export let rowspan: number = 1;
</script>

<td contenteditable bind:textContent={value} {colspan} {rowspan} />
