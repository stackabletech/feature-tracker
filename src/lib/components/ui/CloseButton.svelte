<script lang="ts">
	import { XIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	let classes: string = '';
	export { classes as class };
</script>

<Button on:click class={classes} tip="close">
	<XIcon size="16" />
</Button>
