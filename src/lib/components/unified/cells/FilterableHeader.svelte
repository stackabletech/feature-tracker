<script lang="ts">
	import { tick } from 'svelte';

	let classes = '';
	export { classes as class };

	import Header from '$lib/components/unified/cells/Header.svelte';
	import CloseButton from '$lib/components/ui/CloseButton.svelte';
	import FilterButton from '$lib/components/ui/FilterButton.svelte';

	let input: HTMLInputElement;
	export let filter: string = '';

	let edit = async () => {
		editMode = true;
		await tick();
		input.focus();
	};

	let cancel = () => {
		filter = '';
		editMode = false;
	};

	const handle = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			cancel();
		}
	};

	let editMode: boolean = filter !== '';
</script>

<Header sticky class="{classes} left-48 bg-base-300 group" {editMode}>
	<slot name="pre" slot="pre" />
	<span on:click={edit}>
		<slot />
	</span>

	<FilterButton slot="post" on:click={edit} class="opacity-25 group-hover:opacity-100" />

	<div slot="edit" class="input-group input-group-sm">
		<input
			class="input input-bordered input-sm"
			type="text"
			placeholder="filter"
			on:keydown={handle}
			bind:value={filter}
			bind:this={input}
		/>
		<CloseButton class="btn-outline btn-sm" on:click={cancel} />
	</div>
</Header>
