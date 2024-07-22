<script lang="ts">
  import type { PageData } from './$types';
  import Code from '$lib/components/Code.svelte';

  export let data: PageData;
  $: ({ product_feature } = data);
</script>

<Code>
  <pre> {JSON.stringify(product_feature, null, 2)} </pre>
</Code>
