<script lang="ts">
	import { ChevronRightIcon, ChevronsRightIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	export let double: boolean = false;
	export let expanded: boolean = false;
	export let forcedOpen: boolean = false;

	$: tip = expanded ? 'collapse' : 'expand';

	const toggle = () => {
		// This forces Safari to rerender the table when expanded, which it otherwise won't do 😠.
		document.querySelector('table').classList.toggle('rerender');
		expanded = !expanded;
	};
</script>

<Button on:click={toggle} {tip} disabled={forcedOpen}>
	<svelte:component
		this={double ? ChevronsRightIcon : ChevronRightIcon}
		size="16"
		class="transition-all {(expanded || forcedOpen) && 'rotate-90'}"
	/>
</Button>

<style>
	:global(.rerender) {
		transform: translateZ(1px);
	}
</style>
