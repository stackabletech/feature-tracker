<script lang="ts">
  import Tab from './Tab.svelte';
  export let tabs;
</script>

<nav class="tabs tabs-lift tabs-xs flex max-w-full sm:tabs-sm">
  <div class="tab w-4" />
  {#each tabs as { name, url }}
    <Tab {name} {url} />
  {/each}
  <div class="tab grow" />
</nav>
