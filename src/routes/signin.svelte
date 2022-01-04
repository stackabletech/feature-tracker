<script lang="ts">
	import { signed_in } from '$lib/stores';
	import { Result } from 'postcss';
	let input;

	const checkPWD = async () => {
		const res = await fetch('/api/pwd', {
			method: 'POST',
			body: JSON.stringify({
				pwd: input.value
			})
		});

		if (res.status === 200) {
			const { result } = await res.json();
			console.log(result);
			$signed_in = result;
		}
	};
</script>

<main class="grow grid place-items-center">
	{#if !$signed_in}
		<input type="text" bind:this={input} on:change={checkPWD} placeholder="type here..." />
	{:else}
		<p>You are signed in</p>
	{/if}
</main>
