<script lang="ts">
  import type { PageProps } from './$types';
  import Code from '$lib/components/Code.svelte';

  let { data }: PageProps = $props();
</script>

<Code filename="/api/releases/{data.release.id}.json">
  <pre>{JSON.stringify(data.release, null, 2)}</pre>
</Code>
