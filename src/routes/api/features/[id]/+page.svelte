<script lang="ts">
  import Code from '$lib/components/Code.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ feature } = data);
</script>

<Code>
  <pre> {JSON.stringify(feature, null, 2)} </pre>
</Code>
