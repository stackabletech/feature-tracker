<script lang="ts">
	import { InfoIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	let classes: string = '';
	export { classes as class };
</script>

<Button on:click class="btn-outline {classes}" tip="show menu">
	<InfoIcon size="16" />
</Button>
