<script lang="ts">
	import { ListIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	let classes: string = '';
	export { classes as class };
</script>

<Button on:click class={classes} tip="sort">
	<ListIcon size="16" />
</Button>
