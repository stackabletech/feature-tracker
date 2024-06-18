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
    <div class="rounded-full bg-error p-1 {classes}">
      <XCircleIcon size="14" class="text-error-content" />
    </div>
  {:else if status == 'PLANNED'}
    <div class="rounded-full bg-info p-1 {classes}">
      <CalendarIcon size="14" class="text-info-content" />
    </div>
  {:else if status == 'IN_PROGRESS'}
    <div class="rounded-full bg-warning p-1 {classes}">
      <ActivityIcon size="14" class="text-warning-content" />
    </div>
  {:else if status == 'COMPLETED'}
    {#if released}
      <div class="rounded-full bg-success p-1 {classes}">
        <CheckCircleIcon size="14" class="text-success-content" />
      </div>
    {:else}
      <div class="bg-base rounded-full border border-success p-1 {classes}">
        <CheckCircleIcon size="14" class="text-success" />
      </div>
    {/if}
  {:else if status == 'NOT_AVAILABLE'}
    <div
      class="flex h-[22px] w-[22px] justify-center rounded-full bg-base-300 align-middle text-[8px] font-bold leading-[22px] {classes}"
    >
      N/A
    </div>
  {/if}
</div>
