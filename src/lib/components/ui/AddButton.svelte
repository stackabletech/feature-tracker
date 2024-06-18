<script lang="ts">
  import { PlusIcon } from 'svelte-feather-icons';
  import Button from './Button.svelte';

  let classes: string = '';
  export { classes as class };

  export let tip: string = 'add';
</script>

<Button {tip} round type="btn-outline" on:click class="opacity-0 group-hover:opacity-100 {classes}">
  <PlusIcon size="14" />
</Button>
