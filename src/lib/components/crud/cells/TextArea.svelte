<script lang="ts">
	import { EditIcon } from 'svelte-feather-icons';
	import Modal from '$lib/components/ui/Modal.svelte';

	export let value: string;
	export let colspan: number = 1;
	export let rowspan: number = 1;

	let modal = false;
	let showModal = () => (modal = true);
	let hideModal = () => (modal = false);
</script>

<td on:click={showModal} {colspan} {rowspan}>
	<EditIcon size="20" class="mx-auto" />
</td>

{#if modal}
	<Modal on:close={hideModal}>
		<h3 class="font-bold" slot="title">Edit text:</h3>
		<div class="form-control">
			<textarea class="textarea w-full h-64" placeholder="edit text" bind:value />
			<label class="label" for="">
				<span class="label-text-alt">
					You can close this modal after editing. Don't forget to save your changes.
				</span>
			</label>
		</div>
	</Modal>
{/if}
