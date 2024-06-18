<script lang="ts">
  import type { PageData } from './$types';
  import Code from '$lib/components/Code.svelte';

  export let data: PageData;
  $: ({ release } = data);
</script>

<Code>
  <pre> {JSON.stringify(release, null, 2)} </pre>
</Code>
