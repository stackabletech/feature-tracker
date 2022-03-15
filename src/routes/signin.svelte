<script lang="ts">
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';
	import { serialize } from 'cookie';

	let { session } = getStores();
	let input: HTMLInputElement;

	const setCookie = () => (document.cookie = serialize('pwd', input.value, { path: '/' }));
	const submit = (e: KeyboardEvent) => e.key === 'Enter' && goto('/edit');
</script>

<svelte:body on:keyup={submit} />

<main class="grow grid place-items-center">
	<div class="flex flex-col form-control">
		<label for="pass" class="label">
			<span class="label-text transition-all {$session.pwd == '' ? '' : 'opacity-0'}">
				Type or paste the password.
			</span>
		</label>
		<div class="input-group">
			<input
				id="pass"
				class="input input-bordered input-primary"
				type="password"
				placeholder="Type or paste password and press Enter."
				bind:this={input}
				bind:value={$session.pwd}
				on:change={setCookie}
			/>
			<button class="btn btn-primary btn-square" disabled={$session.pwd == ''}>Go</button>
		</div>
		<label for="pass" class="label">
			<span class="label-text-alt" />
			<span class="label-text-alt transition-all {$session.pwd == '' ? 'opacity-0' : ''}">
				or press <kbd class="kbd kbd-xs">Enter</kbd>
			</span>
		</label>
	</div>
</main>
