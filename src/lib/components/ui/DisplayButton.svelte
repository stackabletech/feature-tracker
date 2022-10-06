<script lang="ts">
	import Button from './Button.svelte';
	import { EyeIcon } from 'svelte-feather-icons';

	export let tip = 'display options';
</script>

<div class="tooltip tooltip-right" data-tip={tip}>
	<Button on:click type="btn-outline">
		<EyeIcon size="16" />
	</Button>
</div>
