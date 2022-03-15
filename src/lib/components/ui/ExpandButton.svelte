<script lang="ts">
	import { ChevronRightIcon, ChevronsRightIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	export let double: boolean = false;
	export let expanded: boolean = false;

	const toggle = () => (expanded = !expanded);
</script>

<Button on:click={toggle}>
	<svelte:component
		this={double ? ChevronsRightIcon : ChevronRightIcon}
		size="16"
		class="transition-all {expanded && 'rotate-90'}"
	/>
</Button>
