<script lang="ts">
  import '/src/app.css';
  import {categories, features, productFeatures, products, releases} from '$lib/stores';
  import {SvelteToast} from '@zerodevx/svelte-toast';
  import {LogInIcon, MenuIcon, MoonIcon, SunIcon} from 'svelte-feather-icons';

  import type {LayoutData} from './$types';

  export let data: LayoutData;

  $: $products = data.products;
  $: $categories = data.categories;
  $: $features = data.features;
  $: $productFeatures = data.productFeatures;
  $: $releases = data.releases;

  const toastOptions = {
    pausable: true
  };

  let mouse = {
    x: 0,
    y: 0
  };
  const setMouseCoords = (e: PointerEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
</script>

<svelte:head>
  <title>Stackable Feature Tracker</title>
</svelte:head>

<div class="drawer h-screen w-screen lg:drawer-open">
  <input type="checkbox" id="sidebar-drawer" class="drawer-toggle"/>
  <div class="drawer-content flex max-h-screen flex-col">
    <nav class="navbar z-30 w-full">
      <div class="flex-none lg:hidden">
        <label for="sidebar-drawer" class="btn btn-square btn-ghost">
          <MenuIcon size="24"/>
        </label>
      </div>
      <div class="flex-1">
        <span class="text-lg font-bold">Stackable Feature Tracker</span>
      </div>
      <div class="flex-none float-right mx-2">
        <label class="btn btn-square btn-ghost swap swap-rotate">
          <input
            type="checkbox"
            name="theme"
            id="theme-toggle"
            class="theme-controller"
            value="dark"
          />
          <SunIcon class="swap-on" size="24"/>
          <MoonIcon class="swap-off" size="24"/>
        </label>

        <a href="/signin" role="button" class="btn btn-square btn-ghost">
          <LogInIcon size="24"/>
        </a>
      </div>
    </nav>
    <div class="relative flex h-full flex-col overflow-auto">
      <slot/>
    </div>
  </div>

  <div class="drawer-side z-30 border-r-(--tab-border-color)">
    <label for="sidebar-drawer" class="drawer-overlay"/>
    <aside class="min-h-full w-36 bg-base-100">
      <div class="navbar sticky top-0 place-content-center">
        <a href="/">
          <div class="flex h-10 w-10 items-center justify-center rounded-md bg-white">
            <img class="h-8 w-8" src="/img/icon-colour.png" alt=""/>
          </div>
        </a>
      </div>
      <ul class="menu w-full font-bold">
        <li>
          <a href="/api" class="">Browse API</a>
        </li>
        <li>
          <a href="/edit" class="">Edit Data</a>
        </li>
        <li>
          <a href="/unified" class="">Unified View</a>
        </li>
        <li>
          <a href="/release" class="">Release View</a>
        </li>
      </ul>
    </aside>
  </div>
</div>

<SvelteToast options={toastOptions}/>

<div id="mouse" class="fixed w-64" style="left: {mouse.x - 64}px; top: {mouse.y + 16}px;"/>
<svelte:window on:pointermove={setMouseCoords}/>

<div id="modal"/>

<style lang="postcss">

    @reference '../app.css';

    :global(.tooltip::before) {
        z-index: 1000;
        filter: brightness(1.01);
        -webkit-filter: brightness(1.01);
        display: block;
        position: absolute;
    }

    :global(._toastContainer) {
        @apply z-50;
    }

    :global(._toastContainer li) {
        @apply rounded-box bg-white;
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
