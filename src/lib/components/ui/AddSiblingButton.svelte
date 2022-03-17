<script lang="ts">
	import { ArrowDownIcon, ArrowRightIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	export let horizontal: boolean = false;
</script>

<Button on:click type="btn-outline" tip="add sibling">
	<svelte:component this={horizontal ? ArrowRightIcon : ArrowDownIcon} size="14" />
</Button>
