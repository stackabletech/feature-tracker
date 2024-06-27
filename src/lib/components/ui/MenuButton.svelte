<script lang="ts">
  import { MoreHorizontalIcon } from 'svelte-feather-icons';
  import Button from './Button.svelte';

  let classes: string = '';
  export { classes as class };
</script>

<Button
  on:click
  class="opacity-0 group-hover:opacity-100 {classes}"
  tip="show menu"
  tipPlacement="left"
>
  <MoreHorizontalIcon size="16" />
</Button>
