<script lang="ts">
	import { ChevronsRightIcon } from 'svelte-feather-icons';
	import Button from './Button.svelte';

	export let collapse = false;
	$: tip = collapse ? 'collapse all' : 'expand all';
</script>

<Button on:click {tip} type="btn-outline">
	<ChevronsRightIcon size="16" class="transition-all {collapse || 'rotate-90'}" />
</Button>
