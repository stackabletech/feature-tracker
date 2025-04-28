<script lang="ts">
  export let filename: string = '';
</script>

<main class="p-8">
  {#if filename}
    <pre>{filename}</pre>
  {/if}
  <div class="bg-base-300 rounded-xl p-8 text-sm">
    <slot />
  </div>
</main>
