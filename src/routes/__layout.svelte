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
</script>

<div
	class="drawer drawer-mobile min-h-screen min-w-screen h-full w-full max-h-full max-w-full overflow-hidden"
>
	<input type="checkbox" id="sidebar-drawer" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<nav class="w-full navbar sticky top-0 z-50 backdrop-blur">
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
			<div class="navbar sticky top-0 place-content-center z-50">
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
					<a href="/features" class="btn btn-ghost m-2">Feature View</a>
				</li>
				<li>
					<a href="/products" class="btn btn-ghost m-2">Product View</a>
				</li>
				<li>
					<a href="/roadmap" class="btn btn-ghost m-2">Roadmap View</a>
				</li>
				<li>
					<a href="/techtree" class="btn btn-ghost m-2">Tech Tree View</a>
				</li>
			</ul>
		</aside>
	</div>
</div>

<div class="toastwrapper">
	<SvelteToast options={toastOptions} />
</div>
