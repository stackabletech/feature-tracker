<script lang="ts">
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/features.json">
  <pre>[</pre>
  {#each data.features as feature (feature.id)}
    <button
      class="cursor-pointer text-left font-mono"
      onclick={() => goto(`features/${feature.id}`)}>{JSON.stringify(feature, null, 2)},</button
    >
  {/each}
  <pre>]</pre>
</Code>
