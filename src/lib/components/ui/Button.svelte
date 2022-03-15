<script lang="ts">
	let classes: string = '';
	export { classes as class };
</script>

<button class="btn btn-ghost btn-sm btn-square {classes}" on:click>
	<slot />
</button>
