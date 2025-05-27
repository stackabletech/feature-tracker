<script lang="ts">
  import Tab from './Tab.svelte';
  let { tabs } = $props();
</script>

<nav class="tabs tabs-lift max-sm:tabs-xs">
  <div class="tab"></div>
  {#each tabs as { name, url } (url)}
    <Tab {name} {url} />
  {/each}
  <div class="tab"></div>
</nav>
