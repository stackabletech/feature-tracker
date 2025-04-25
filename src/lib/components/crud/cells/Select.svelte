<script lang="ts">
  export let value: string;
  export let options;
  export let optional = false;
  export let colspan: number = 1;
  export let rowspan: number = 1;
</script>

<td {colspan} {rowspan}>
  <select id="select" name="select" class="select w-full" bind:value>
    {#if optional}
      <option value={null} />
    {/if}
    {#each options as { value, label } (value)}
      <option {value}>{label}</option>
    {/each}
  </select>
</td>
