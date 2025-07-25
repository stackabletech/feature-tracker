<script lang="ts">
  interface Props {
    rowspan?: number;
    colspan?: number;
    value?: boolean;
    labelFalse?: string;
    labelTrue?: string;
  }

  let {
    rowspan = 1,
    colspan = 1,
    value = $bindable(),
    labelFalse = 'False',
    labelTrue = 'True'
  }: Props = $props();
</script>

<td {colspan} {rowspan}>
  <div class="flex flex-row items-center justify-center">
    <div class="tooltip mr-2 h-6 w-6" data-tip={value ? labelTrue : labelFalse}>
      <input type="checkbox" bind:checked={value} class="checkbox checkbox-sm" />
    </div>
  </div>
</td>
