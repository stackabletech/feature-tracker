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
    <div class="bg-error rounded-full p-1 {classes}">
      <XCircleIcon size="14" class="text-error-content" />
    </div>
  {:else if status == 'PLANNED'}
    <div class="bg-info rounded-full p-1 {classes}">
      <CalendarIcon size="14" class="text-info-content" />
    </div>
  {:else if status == 'IN_PROGRESS'}
    <div class="bg-warning rounded-full p-1 {classes}">
      <ActivityIcon size="14" class="text-warning-content" />
    </div>
  {:else if status == 'COMPLETED'}
    {#if released}
      <div class="bg-success rounded-full p-1 {classes}">
        <CheckCircleIcon size="14" class="text-success-content" />
      </div>
    {:else}
      <div class="bg-base border-success rounded-full border p-1 {classes}">
        <CheckCircleIcon size="14" class="text-success" />
      </div>
    {/if}
  {:else if status == 'NOT_AVAILABLE'}
    <div
      class="bg-base-300 flex h-[22px] w-[22px] justify-center rounded-full align-middle text-[8px] leading-[22px] font-bold {classes}"
    >
      N/A
    </div>
  {/if}
</div>
