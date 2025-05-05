<script lang="ts">
  import type { PageProps } from './$types';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/categories/{data.product.id}.json">
  <pre>{JSON.stringify(data.product, null, 2)}</pre>
</Code>
