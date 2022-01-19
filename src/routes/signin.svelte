<script context="module">
</script>

<script lang="ts">
	import { getStores } from '$app/stores';
	import { serialize } from 'cookie';

	let input: HTMLInputElement;

	let { session } = getStores();
</script>

<main class="grow grid place-items-center">
	<input
		class="border border-black border-solid p-3 rounded-xl"
		type="text"
		bind:this={input}
		bind:value={$session.pwd}
		on:change={() => {
			document.cookie = serialize('pwd', input.value, { path: '/' });
		}}
	/>
</main>
