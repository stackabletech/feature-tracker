<script lang="ts">
	import { goto } from '$app/navigation';
	import { serialize } from 'cookie';

	const setCookie = () => (document.cookie = serialize('pwd', pwd, { path: '/' }));
	const submit = (e: KeyboardEvent) => e.key === 'Enter' && goto('/edit');

	let pwd = '';
</script>

<svelte:body on:keyup={submit} />

<main class="grow grid place-items-center">
	<div class="flex flex-col form-control">
		<label for="pass" class="label">
			<span class="label-text transition-all {pwd == '' ? '' : 'opacity-0'}">
				Type or paste the password.
			</span>
		</label>
		<div class="input-group">
			<input
				id="pass"
				class="input input-bordered input-primary"
				type="password"
				placeholder="Type or paste password and press Enter."
				bind:value={pwd}
				on:change={setCookie}
			/>
			<button class="btn btn-primary btn-square" disabled={pwd == ''}>Go</button>
		</div>
		<label for="pass" class="label">
			<span class="label-text-alt" />
			<span class="label-text-alt transition-all {pwd == '' ? 'opacity-0' : ''}">
				or press <kbd class="kbd kbd-xs">Enter</kbd>
			</span>
		</label>
	</div>
</main>
