<script lang="ts">
	let classes: string = '';
	export { classes as class };

	export let round: boolean = false;
	export let type: string = 'btn-ghost';
	export let tip: string = undefined;
	export let disabled: boolean = false;
</script>

<div class={tip ? 'tooltip tooltip-right' : 'inline-block'} data-tip={tip}>
	<button
		class="btn btn-xs {type} {round ? 'btn-circle' : 'btn-square'} {classes}"
		{disabled}
		on:click
	>
		<slot />
	</button>
</div>
