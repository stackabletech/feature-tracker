<script lang="ts">
	import CloseButton from '$lib/components/ui/CloseButton.svelte';
	import MenuButton from '$lib/components/ui/MenuButton.svelte';

	export let menu: boolean = false;
	let showMenu: boolean = false;

	export let editMode: boolean = false;

	let toggleMenu = () => {
		showMenu = !showMenu;
	};
</script>

<div class="flex flex-row justify-between items-center transition-all {editMode ? 'w-72' : 'w-48'}">
	{#if showMenu}
		<slot name="indent" />
		<div class="w-8">
			<slot name="pre" />
		</div>
		<slot name="menu" />
		<div class="w-8">
			<CloseButton on:click={toggleMenu} />
		</div>
	{:else if editMode}
		<div class="mx-2 truncate text-center">
			<slot name="edit" />
		</div>
	{:else}
		<slot name="indent" />
		<div class="w-8">
			<slot name="pre" />
		</div>
		<div class="mx-2 truncate text-center">
			<slot />
		</div>
		<div class="w-8">
			{#if menu}
				<MenuButton on:click={toggleMenu} />
			{/if}
		</div>
	{/if}
</div>
