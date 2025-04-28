<script lang="ts">
  import { AlertTriangleIcon, DeleteIcon } from 'svelte-feather-icons';
  import Button from './Button.svelte';

  let confirm = false;

  const handleFirstClick = () => {
    confirm = true;
  };
</script>

{#if confirm}
  <Button class="btn-error" type="btn-outline" on:click round tip="confirm delete">
    <AlertTriangleIcon size="14" class="-mt-[1px] mb-[1px]" />
  </Button>
{:else}
  <Button on:click={handleFirstClick} type="btn-outline" tip="delete">
    <DeleteIcon size="14" class="mr-[1px] -ml-[1px]" />
  </Button>
{/if}
