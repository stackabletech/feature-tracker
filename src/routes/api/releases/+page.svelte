<script lang="ts">
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/releases.json">
  <pre>[</pre>
  {#each data.releases as release (release.id)}
    <button
      class="cursor-pointer text-left font-mono"
      onclick={() => goto(`releases/${release.id}`)}
    >
      {JSON.stringify(release, null, 2)},
    </button>
  {/each}
  <pre>]</pre>
</Code>
