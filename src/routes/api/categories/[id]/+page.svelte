<script lang="ts">
  import type { PageProps } from './$types';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/categories/{data.category.id}.json">
  <pre>{JSON.stringify(data.category, null, 2)}</pre>
</Code>
