<script lang="ts">
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
>
	<div class="card bg-base-100 shadow-xl w-96" on:click|stopPropagation>
		<div class="card-body">
			<header class="flex mb-4">
				<div class="flex grow align-middle">
					<slot name="title" />
				</div>
				<div class="justify-end">
					<CloseButton on:click={close} />
				</div>
			</header>
			<slot />
		</div>
	</div>
</aside>
