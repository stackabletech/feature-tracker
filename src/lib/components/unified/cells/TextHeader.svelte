<script type="ts">
	import TextInput from '$lib/components/ui/TextInput.svelte';

	import Header from '../cells/Header.svelte';

	export let value: string = '';
	export let menu: boolean = false;

	let editMode: boolean = false;

	let toggleEditMode = () => {
		editMode = !editMode;
	};

	let handleSubmit = (e: CustomEvent) => {
		value = e.detail.value;
		toggleEditMode();
	};

	let handleCancel = () => {
		toggleEditMode();
	};
</script>

<Header {menu} {editMode}>
	<slot name="pre" />
	<svelte:fragment slot="edit">
		<TextInput {value} on:submit={handleSubmit} on:cancel={handleCancel} />
	</svelte:fragment>
	<span on:click={toggleEditMode} class="cursor-cell">{value}</span>
</Header>
