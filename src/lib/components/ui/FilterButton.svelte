<script lang="ts">
  import { FilterIcon } from 'svelte-feather-icons';
  import Button from './Button.svelte';

  let classes: string = '';
  export { classes as class };
</script>

<Button on:click class={classes} tip="filter">
  <FilterIcon size="16" />
</Button>
