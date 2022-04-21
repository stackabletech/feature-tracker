<script lang="ts">
	import Cell from './Cell.svelte';

	export let menu: boolean = false;
	export let editMode: boolean = false;
	export let showMenu: boolean = false;

	export let sticky: boolean = false;
	export let centered: boolean = false;

	export let colspan: number = 1;
	export let rowspan: number = 1;

	let classes: string = '';
	export { classes as class };
</script>

<th class="group {sticky && 'sticky z-10'} {classes}" {colspan} {rowspan}>
	<Cell {menu} {editMode} {centered} bind:showMenu>
		<slot name="indent" slot="indent" />
		<slot name="pre" slot="pre" />
		<slot name="menu" slot="menu" />
		<slot name="edit" slot="edit" />
		<slot name="post" slot="post" />
		<slot />
	</Cell>
</th>
