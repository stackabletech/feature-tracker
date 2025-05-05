<script lang="ts">
  import type { PageProps } from './$types';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/features/{data.feature.id}.json">
  <pre> {JSON.stringify(data.feature, null, 2)} </pre>
</Code>
