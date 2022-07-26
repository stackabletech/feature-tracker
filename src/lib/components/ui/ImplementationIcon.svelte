<script lang="ts">
	import type { ImplementationStatus } from '$lib/prisma';
	import { ActivityIcon, CalendarIcon, CheckCircleIcon, XCircleIcon } from 'svelte-feather-icons';
	export let status: ImplementationStatus;

	let classes = '';
	export { classes as class };
</script>

{#if status == 'NOT_PLANNED'}
	<div class="p-1 rounded-full bg-error {classes}">
		<XCircleIcon size="14" class="text-white" />
	</div>
{:else if status == 'PLANNED'}
	<div class="p-1 rounded-full bg-info {classes}">
		<CalendarIcon size="14" class="text-white" />
	</div>
{:else if status == 'IN_PROGRESS'}
	<div class="p-1 rounded-full bg-warning {classes}">
		<ActivityIcon size="14" class="text-white" />
	</div>
{:else if status == 'COMPLETED'}
	<div class="p-1 rounded-full bg-success {classes}">
		<CheckCircleIcon size="14" class="text-white" />
	</div>
{:else if status == 'NOT_AVAILABLE'}
	<div
		class="rounded-full bg-base-300 text-white w-[22px] h-[22px] text-[9px] leading-[22px] font-bold {classes}"
	>
		N/A
	</div>
{/if}
