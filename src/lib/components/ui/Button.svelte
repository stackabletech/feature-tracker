<script lang="ts">
	let classes: string = '';
	export { classes as class };

	export let round: boolean = false;
	export let type: string = 'btn-ghost';
	export let tip: string = undefined;
</script>

<button
	title={tip}
	class="btn btn-xs {type} {round ? 'btn-circle' : 'btn-square'} {classes}"
	on:click
>
	<slot />
</button>
