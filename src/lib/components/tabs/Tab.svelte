<script lang="ts">
	import { page } from '$app/stores';
	export let name;
	export let url;
</script>

<a class:tab-active={$page.url.pathname.includes(url)} class="tab tab-lifted" href={url}>{name}</a>
