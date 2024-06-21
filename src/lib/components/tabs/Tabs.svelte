<script lang="ts">
  import Tab from './Tab.svelte';
  export let tabs;
</script>

<nav class="tabs-lifted tabs-xs sm:tabs-sm tabs flex max-w-full">
  <div class="tab w-4" />
  {#each tabs as { name, url }}
    <Tab {name} {url} />
  {/each}
  <div class="tab grow" />
</nav>
