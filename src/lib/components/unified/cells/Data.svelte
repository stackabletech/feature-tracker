<script lang="ts">
  import Cell from './Cell.svelte';

  export let menu: boolean = false;
  export let editMode: boolean = false;
  export let showMenu: boolean = false;

  export let sticky: boolean = false;
  export let centered: boolean = false;
</script>

<td class="group {sticky && 'sticky'}">
  <Cell {menu} bind:editMode {centered} bind:showMenu>
    <slot name="indent" slot="indent" />
    <slot name="pre" slot="pre" />
    <slot name="menu" slot="menu" />
    <slot name="edit" slot="edit" />
    <slot name="post" slot="post" />
    <slot name="note" slot="note" />
    <slot />
  </Cell>
</td>
