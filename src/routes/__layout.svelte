<script context="module" lang="ts">
	export const load = async ({ fetch }) => {
		const productResponse = await fetch('/api/products.json');
		const categoryResponse = await fetch('/api/categories.json');
		const featuresResponse = await fetch('/api/features.json');
		const productFeaturesResponse = await fetch('/api/product_features.json');

		const products = await productResponse.json();
		const categories = await categoryResponse.json();
		const features = await featuresResponse.json();
		const productFeatures = await productFeaturesResponse.json();

		return {
			props: {
				products,
				categories,
				features,
				productFeatures
			}
		};
	};
</script>

<script lang="ts">
	import '/src/app.css';
	import {
		categories as categoryStore,
		products as productStore,
		features as featureStore,
		productFeatures as productFeatureStore
	} from '$lib/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { FeatherIcon, LockIcon, MenuIcon } from 'svelte-feather-icons';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	export let products;
	export let categories;
	export let features;
	export let productFeatures;

	$productStore = products;
	$categoryStore = categories;
	$featureStore = features;
	$productFeatureStore = productFeatures;

	const toastOptions = {
		pausable: true
	};

	onMount(() => {
		themeChange(false);
	});

	let mouse = { x: 0, y: 0 };
	const setMouseCoords = (e: PointerEvent) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};
</script>

<div
	class="drawer drawer-mobile min-h-screen min-w-screen h-full w-full max-h-full max-w-full overflow-hidden"
>
	<input type="checkbox" id="sidebar-drawer" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<nav class="w-full navbar sticky top-0 z-30 backdrop-blur">
			<div class="flex-none lg:hidden">
				<label for="sidebar-drawer" class="btn btn-square btn-ghost">
					<MenuIcon size="24" />
				</label>
			</div>
			<div class="flex-1">
				<span class="text-lg font-bold">Stackable Feature Tracker</span>
			</div>
			<div class="flex-0 mx-2 float-right">
				<button class="btn btn-square btn-ghost" data-toggle-theme="dark,light" aria-hidden>
					<FeatherIcon size="24" />
				</button>
				<a href="/signin" role="button" class="btn btn-square btn-ghost">
					<LockIcon size="24" />
				</a>
			</div>
		</nav>
		<div class="grow flex flex-col">
			<slot />
		</div>
	</div>

	<div class="drawer-side border-r-[--tab-border-color]">
		<label for="sidebar-drawer" class="drawer-overlay backdrop-blur" />
		<aside class="w-48 bg-base bg-opacity-50">
			<div class="navbar sticky top-0 place-content-center z-30">
				<a href="/">
					<div class="bg-white rounded-md w-10 h-10 flex items-center justify-center">
						<img class="h-8 w-8" src="/img/icon-colour.png" alt="" />
					</div>
				</a>
			</div>
			<ul class="menu">
				<li>
					<a href="/api" class="btn btn-ghost m-2">Browse API</a>
				</li>
				<li>
					<a href="/edit" class="btn btn-ghost m-2">Edit Data</a>
				</li>
				<li>
					<a href="/unified" class="btn btn-ghost m-2">Unified View</a>
				</li>
				<!-- <li>
					<a href="/roadmap" class="btn btn-ghost m-2">Roadmap View</a>
				</li> -->
				<li>
					<a href="/techtree" class="btn btn-ghost m-2">Tech Tree View</a>
				</li>
			</ul>
		</aside>
	</div>
</div>

<SvelteToast options={toastOptions} />

<div id="mouse" class="fixed w-64" style="left: {mouse.x - 64}px; top: {mouse.y + 16}px;" />
<svelte:window on:pointermove={setMouseCoords} />

<style lang="postcss">
	:global(._toastContainer) {
		@apply z-50;
	}

	:global(._toastContainer li) {
		@apply bg-white rounded-box;
	}

	/* Fix for QuteBrowser not supporting where selector used by DaisyUI's table styling */
	:global(.table-compact th),
	:global(.table-compact td) {
		@apply p-2;
	}
	:global(table tbody th),
	:global(table tbody td) {
		--tw-bg-opacity: 1;
		background-color: hsla(var(--b1) / var(--tw-bg-opacity, 1));
	}
</style>
