<script lang="ts">
	import { info } from '$lib/util/alert';
</script>

<main class="grow grid place-items-center">
	<p on:click={() => info('Hello, World!')}>Hello World.</p>
</main>
