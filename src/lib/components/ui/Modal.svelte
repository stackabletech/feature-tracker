<script lang="ts">
	import { portal } from '$lib/actions/portal';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import CloseButton from './CloseButton.svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
</script>

<aside
	class="fixed inset-0 backdrop-blur bg-neutral-focus bg-opacity-40 z-40 flex items-center justify-center"
	transition:fade={{ duration: 200 }}
	on:click={close}
	use:portal={'#modal'}
>
	<div
		class="card bg-base-200 shadow-xl w-[32rem] max-w-[80%] max-h-[80%]"
		on:click|stopPropagation
	>
		<div class="card-body">
			<header class="flex mb-2">
				<div class="flex grow align-middle">
					<slot name="title" />
				</div>
				<div class="justify-end">
					<CloseButton on:click={close} tipPlacement="left" />
				</div>
			</header>
			<slot />
		</div>
	</div>
</aside>
