<script>
	import '/src/app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	const toastOptions = {
		pausable: true
	};
</script>

<div class="drawer drawer-mobile min-h-screen min-w-screen h-full w-full">
	<input type="checkbox" id="sidebar-drawer" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<nav class="w-full navbar sticky top-0 z-50 backdrop-blur">
			<div class="flex-none lg:hidden">
				<label for="sidebar-drawer" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</label>
			</div>
			<div class="flex-1">
				<span class="text-lg font-bold">Stackable Feature Tracker</span>
			</div>
			<div class="flex-0 mx-2 float-right">
				<a href="/signin" class="text-lg text-primary">Sign In</a>
			</div>
		</nav>
		<slot />
	</div>
	<div class="drawer-side border-r">
		<label for="sidebar-drawer" class="drawer-overlay" />
		<aside class="w-40 bg-white bg-opacity-50 backdrop-blur">
			<div class="navbar sticky top-0 place-content-center z-50 backdrop-blur">
				<a href="/">
					<img class="h-8 w-8" src="/img/icon-colour.png" alt="" />
				</a>
			</div>
			<ul class="menu">
				<li>
					<a href="/api">Browse API</a>
				</li>
				<li>
					<a href="/edit">Edit Data</a>
				</li>
				<li>
					<a href="/features">Feature View</a>
				</li>
				<li>
					<a href="/products">Product View</a>
				</li>
				<li>
					<a href="/roadmap">Roadmap View</a>
				</li>
				<li>
					<a href="/techtree">Tech Tree View</a>
				</li>
			</ul>
		</aside>
	</div>
</div>

<div class="toastwrapper">
	<SvelteToast options={toastOptions} />
</div>
