<script lang="ts">
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ features } = data);
</script>

<Code filename="/api/features.json">
  <pre>[</pre>
  {#each features as feature (feature.id)}
    <button
      class="cursor-pointer text-left font-mono"
      on:click={() => goto(`features/${feature.id}`)}>{JSON.stringify(feature, null, 2)},</button
    >
  {/each}
  <pre>]</pre>
</Code>
