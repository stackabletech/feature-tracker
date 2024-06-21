<script lang="ts">
  import Tab from './Tab.svelte';
  export let tabs;
</script>

<nav class="tabs">
  <div class="tab tab-lifted tab-sm w-4 cursor-default" />
  {#each tabs as { name, url }}
    <Tab {name} {url} />
  {/each}
  <div class="tab tab-lifted tab-sm flex-1 cursor-default" />
</nav>
