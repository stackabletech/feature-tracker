<script lang="ts">
  import Tab from './Tab.svelte';
  export let tabs;
</script>

<nav class="tabs tabs-lift tabs-xs sm:tabs-sm flex max-w-full">
  <div class="tab w-4" />
  {#each tabs as { name, url } (url)}
    <Tab {name} {url} />
  {/each}
  <div class="tab grow" />
</nav>
