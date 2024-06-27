<script lang="ts">
  import Cell from './Cell.svelte';

  export let menu: boolean = false;
  export let editMode: boolean = false;
  export let showMenu: boolean = false;

  export let centered: boolean = false;

  export let colspan: number = 1;
  export let rowspan: number = 1;

  let classes: string = '';
  export { classes as class };
</script>

<th class="group bg-base-100 {classes}" {colspan} {rowspan} on:mouseenter on:mouseleave>
  <Cell {menu} bind:editMode {centered} bind:showMenu>
    <slot name="indent" slot="indent" />
    <slot name="pre" slot="pre" />
    <slot name="menu" slot="menu" />
    <slot name="edit" slot="edit" />
    <slot name="post" slot="post" />
    <slot name="note" slot="note" />
    <slot />
  </Cell>
</th>
