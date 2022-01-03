<script lang="ts">
	import { page } from '$app/stores';
	export let name;
	export let url;
</script>

<a class:tab-active={$page.path.includes(url)} class="tab tab-lifted" href={url}>{name}</a>
