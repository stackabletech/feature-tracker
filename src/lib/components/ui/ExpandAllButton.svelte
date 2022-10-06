<script lang="ts">
	import { ChevronsRightIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	export let collapse = false;
	$: tip = collapse ? 'collapse all' : 'expand all';
</script>

<div class="tooltip tooltip-right" data-tip={tip}>
	<Button on:click type="btn-outline">
		<ChevronsRightIcon size="16" class="transition-all {collapse || 'rotate-90'}" />
	</Button>
</div>
