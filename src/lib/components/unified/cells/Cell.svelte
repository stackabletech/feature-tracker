<script lang="ts">
	import { clickOutside } from '$lib/actions/clickOutside';

	import CloseButton from '$lib/components/ui/CloseButton.svelte';
	import MenuButton from '$lib/components/ui/MenuButton.svelte';

	export let menu: boolean = false;
	export let showMenu: boolean = false;

	export let editMode: boolean = false;
	export let centered: boolean = false;

	let toggleMenu = () => {
		showMenu = !showMenu;
	};

	let toggleEditMode = () => {
		editMode = false;
	};
</script>

<div
	class="flex flex-row items-center transition-all w-full
		{centered ? 'justify-between' : 'justify-start'}
		"
>
	{#if showMenu}
		<slot name="indent" />
		<div class="w-8">
			<slot name="pre" />
		</div>
		<div class="grow">
			<slot name="menu" />
		</div>
		<div class="w-8">
			<CloseButton on:click={toggleMenu} />
		</div>
	{:else if editMode}
		<div class="mx-2 text-center" use:clickOutside on:clickoutside={toggleEditMode}>
			<slot name="edit" />
		</div>
	{:else}
		<slot name="indent" />
		<div class="w-8">
			<slot name="pre" />
		</div>
		<div class="mx-2 truncate grow {centered && 'text-center'}">
			<slot />
		</div>
		<div class="w-8">
			{#if menu}
				<MenuButton on:click={toggleMenu} />
			{:else}
				<slot name="post" />
			{/if}
		</div>
	{/if}
</div>
