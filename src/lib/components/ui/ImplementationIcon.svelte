<script lang="ts">
	import type { ImplementationStatus } from '$lib/prisma';
	import { ActivityIcon, CalendarIcon, CheckCircleIcon, XCircleIcon } from 'svelte-feather-icons';

	export let status: ImplementationStatus;
	export let released: boolean;
	export let tip: boolean = true;

	export let dataTip =
		status === 'COMPLETED'
			? released
				? 'completed and released'
				: 'completed (unreleased)'
			: status.replace('_', ' ').toLowerCase();

	let classes = '';
	export { classes as class };
</script>

<div class={tip ? 'tooltip tooltip-right' : 'inline-block'} data-tip={dataTip}>
	{#if status == 'NOT_PLANNED'}
		<div class="p-1 rounded-full bg-error {classes}">
			<XCircleIcon size="14" class="text-error-content" />
		</div>
	{:else if status == 'PLANNED'}
		<div class="p-1 rounded-full bg-info {classes}">
			<CalendarIcon size="14" class="text-info-content" />
		</div>
	{:else if status == 'IN_PROGRESS'}
		<div class="p-1 rounded-full bg-warning {classes}">
			<ActivityIcon size="14" class="text-warning-content" />
		</div>
	{:else if status == 'COMPLETED'}
		{#if released}
			<div class="p-1 rounded-full bg-success {classes}">
				<CheckCircleIcon size="14" class="text-success-content" />
			</div>
		{:else}
			<div class="p-1 rounded-full bg-base border border-success {classes}">
				<CheckCircleIcon size="14" class="text-success" />
			</div>
		{/if}
	{:else if status == 'NOT_AVAILABLE'}
		<div
			class="rounded-full bg-base-300 w-[22px] h-[22px] text-[8px] leading-[22px] font-bold flex align-middle justify-center {classes}"
		>
			N/A
		</div>
	{/if}
</div>
