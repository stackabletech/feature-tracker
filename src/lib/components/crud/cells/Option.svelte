<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let value: any;
	export let label: string;
	export let prefix: string = undefined;
	export let parents: string[] = undefined;

	let dispatch = createEventDispatcher();
	const select = () => dispatch('select', { value, label });
</script>

<div class="mb-1 last:-mb-1 border-b border-b-base-300 last:border-0">
	<div class="cursor-pointer mb-1 group hover:bg-base-200 p-1 rounded-lg" on:click={select}>
		{#if parents}
			<div
				class="flex flex-row justify-center text-2xs text-base-300 group-hover:text-base-content font-bold gap-2"
			>
				{#each parents.reverse() as parent}
					<span class="parent">{parent}</span>
				{/each}
			</div>
		{/if}
		<div class="text-base-content text-center">
			{#if prefix}
				<span class="text-base-300 mr-1">{prefix}</span>
			{/if}
			<span class="group-hover:font-bold">
				{label}
			</span>
		</div>
	</div>
</div>

<style>
	.parent::after {
		content: '>';
		margin-left: 0.5rem;
	}

	.parent:last-child::after {
		content: '';
	}
</style>
