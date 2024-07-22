<script lang="ts">
  import { ArrowDownIcon, ArrowRightIcon } from 'svelte-feather-icons';
  import Button from './Button.svelte';

  export let horizontal: boolean = false;
  export let tip = 'add sibling';
</script>

<Button on:click type="btn-outline" {tip}>
  <svelte:component this={horizontal ? ArrowRightIcon : ArrowDownIcon} size="14" />
</Button>
