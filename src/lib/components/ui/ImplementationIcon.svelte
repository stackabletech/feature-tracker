<script lang="ts">
	import type { ImplementationStatus } from '$lib/prisma';
	import { ActivityIcon, CalendarIcon, CheckCircleIcon, XCircleIcon } from 'svelte-feather-icons';
	export let status: ImplementationStatus;
</script>

{#if status == 'NOT_PLANNED'}
	<div class="p-1 rounded-full bg-error">
		<XCircleIcon size="14" class="text-white" />
	</div>
{:else if status == 'PLANNED'}
	<div class="p-1 rounded-full bg-info">
		<CalendarIcon size="14" class="text-white" />
	</div>
{:else if status == 'IN_PROGRESS'}
	<div class="p-1 rounded-full bg-warning">
		<ActivityIcon size="14" class="text-white" />
	</div>
{:else if status == 'COMPLETED'}
	<div class="p-1 rounded-full bg-success">
		<CheckCircleIcon size="14" class="text-white" />
	</div>
{/if}
