<script lang="ts">
  import { page } from '$app/state';
  let { name, url } = $props();
</script>

<a class:tab-active={page.url.pathname.includes(url)} class="tab" href={url}>
  {name}
</a>
