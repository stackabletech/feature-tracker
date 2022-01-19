<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import { signed_in } from '$lib/stores';
</script>

{#if $signed_in}
	<slot />
{:else}
	<main class="grow grid place-items-center">
		<a href="/signin" class="underline text-primary">⚠️ Please Log In</a>
	</main>
{/if}
