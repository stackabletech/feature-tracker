<script lang="ts">
	import Cell from './Cell.svelte';

	export let menu: boolean = false;
	export let editMode: boolean = false;

	export let sticky: boolean = false;
	export let centered: boolean = false;

	let classes: string = '';
	export { classes as class };
</script>

<th class="group {sticky && 'sticky z-10'} {classes}">
	<Cell {menu} {editMode} {centered}>
		<slot name="indent" slot="indent" />
		<slot name="pre" slot="pre" />
		<slot name="menu" slot="menu" />
		<slot name="edit" slot="edit" />
		<slot />
	</Cell>
</th>
