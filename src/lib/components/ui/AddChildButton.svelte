<script lang="ts">
	import { CornerDownRightIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';
</script>

<Button on:click type="btn-outline" tip="add child">
	<CornerDownRightIcon size="14" />
</Button>
