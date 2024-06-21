<script lang="ts">
  import Text from './Text.svelte';
  import TextArea from './TextArea.svelte';
  import Date from './Date.svelte';
  import Boolean from './Boolean.svelte';
  import SelectImplementationStatus from './SelectImplementationStatus.svelte';
  import SelectCategory from './SelectCategory.svelte';
  import SelectProduct from './SelectProduct.svelte';
  import SelectFeature from './SelectFeature.svelte';
  import SelectRelease from './SelectRelease.svelte';

  export let value: any;
  export let type: string;

  export let colspan = 1;
  export let rowspan = 1;
</script>

{#if type === 'id'}
  {#if value}
    <th class="text-base-300">#{value}</th>
  {:else}
    <td class="font-bold">New:</td>
  {/if}
{:else if type === 'category_id'}
  <td>TODO: FIX</td>
  <!-- <SelectCategory bind:value {colspan} {rowspan} /> -->
{:else if type === 'parent_id'}
  <td>TODO: FIX</td>
  <!-- <SelectCategory bind:value {colspan} {rowspan} optional /> -->
{:else if type === 'product_id'}
  <td>TODO: FIX</td>
  <!-- <SelectProduct bind:value {colspan} {rowspan} /> -->
{:else if type === 'feature_id'}
  <td>TODO: FIX</td>
  <!-- <SelectFeature bind:value {colspan} {rowspan} /> -->
{:else if type === 'release_id'}
  <td>TODO: FIX</td>
  <!-- <SelectRelease bind:value {colspan} {rowspan} optional /> -->
{:else if type === 'implementation_status'}
  <td>TODO: FIX</td>
  <!-- <SelectImplementationStatus bind:value {colspan} {rowspan} /> -->
{:else if type === 'implementation_date'}
  <Date bind:value {colspan} {rowspan} />
{:else if type === 'name' || type === 'implementation_version'}
  <Text bind:value {colspan} {rowspan} />
{:else if type === 'date'}
  <Date bind:value {colspan} {rowspan} />
{:else if type === 'released'}
  <Boolean bind:value {colspan} {rowspan} labelFalse="Unreleased" labelTrue="Released" />
{:else if type.toLowerCase() === 'note'}
  <TextArea bind:value {colspan} {rowspan} />
{:else}
  <td class="text-base-300">not implemented</td>
{/if}
