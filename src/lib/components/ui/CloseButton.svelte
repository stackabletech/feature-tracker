<script lang="ts">
	import { XIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	let classes: string = '';
	export let tipPlacement: string = 'right';

	export { classes as class };
</script>

<Button on:click class={classes} tip="close" {tipPlacement}>
	<XIcon size="16" />
</Button>
