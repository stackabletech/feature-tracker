<script lang="ts">
  import { goto } from '$app/navigation';
  import Code from '$lib/components/Code.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ releases } = data);
</script>

<Code filename="/api/releases.json">
  <pre>[</pre>
  {#each releases as release}
    <pre class="cursor-pointer" on:click={() => goto(`releases/${release.id}`)}>
      {JSON.stringify(release, null, 2)},
    </pre>
  {/each}
  <pre>]</pre>
</Code>
