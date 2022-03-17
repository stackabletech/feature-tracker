<script type="ts">
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	import Header from '../cells/Header.svelte';
	import Data from '../cells/Data.svelte';

	export let value: string = '';
	export let menu: boolean = false;
	export let sticky: boolean = false;

	export let header: boolean = true;
	$: type = header ? Header : Data;

	let editMode: boolean = false;

	let toggleEditMode = () => {
		editMode = !editMode;
	};

	let handleSubmit = (e: CustomEvent) => {
		value = e.detail.value;
		dispatch('update', { value });
		toggleEditMode();
	};

	let handleCancel = () => {
		toggleEditMode();
	};
</script>

<svelte:component this={type} {menu} {editMode} {sticky}>
	<slot name="pre" slot="pre" />
	<svelte:fragment slot="edit">
		<TextInput {value} on:submit={handleSubmit} on:cancel={handleCancel} />
	</svelte:fragment>
	<span on:click={toggleEditMode} class="cursor-cell">{value}</span>
	<slot name="menu" slot="menu" />
</svelte:component>
