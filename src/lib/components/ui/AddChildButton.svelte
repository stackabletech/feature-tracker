<script lang="ts">
	import { CornerDownRightIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	export let tip = 'add child';
</script>

<Button on:click type="btn-outline" {tip}>
	<CornerDownRightIcon size="14" />
</Button>
