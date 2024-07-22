<script lang="ts">
  let classes: string = '';
  export { classes as class };

  export let round: boolean = false;
  export let type: string = 'btn-ghost';
  export let tip: string = '';
  export let disabled: boolean = false;
  export let tipPlacement: string = 'right';

  let tipLocation =
    tipPlacement === 'left'
      ? 'tooltip-left'
      : tipPlacement === 'right'
        ? 'tooltip-right'
        : tipPlacement === 'bottom'
          ? 'tooltip-bottom'
          : 'tooltip-top';
</script>

<div class={tip ? 'tooltip ' + tipLocation : 'inline-block'} data-tip={tip}>
  <button
    class="btn btn-xs {type} {round ? 'btn-circle' : 'btn-square'} {classes}"
    {disabled}
    on:click
  >
    <slot />
  </button>
</div>
