<script lang="ts">
	import Button from './Button.svelte';
	import { EyeIcon } from 'svelte-feather-icons';

	export let tip = 'display options';
</script>

<Button on:click type="btn-outline" {tip}>
	<EyeIcon size="16" />
</Button>
