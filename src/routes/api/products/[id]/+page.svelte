<script lang="ts">
  import type { PageData } from './$types';
  import Code from '$lib/components/Code.svelte';

  export let data: PageData;
  $: ({ product } = data);
</script>

<Code>
  <pre>{JSON.stringify(product, null, 2)}</pre>
</Code>
