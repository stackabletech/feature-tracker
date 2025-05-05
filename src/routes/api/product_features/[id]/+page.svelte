<script lang="ts">
  import type { PageProps } from './$types';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/product_features/{data.product_feature.id}.json">
  <pre> {JSON.stringify(data.product_feature, null, 2)} </pre>
</Code>
