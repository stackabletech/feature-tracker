<script lang="ts">
  export let optional = true;

  export let value = undefined;
  let checked = optional ? !(value === null) : true;

  export let rowspan: number = 1;
  export let colspan: number = 1;

  let date = new Date(value || Date.now());
  $: month = date.getMonth() + 1;
  $: year = date.getFullYear();

  $: inputValue = `${year}-${month}`;
  $: value = checked ? date.toISOString() : null;

  let updateValue = (d: number) => {
    date = new Date(date.setMonth(date.getMonth() + d));
  };

  let handleInput = (e: KeyboardEvent) => {
    if (e.key == 'Escape' || e.key == 'Tab') return;

    e.preventDefault();
    (e.key == 'ArrowUp' || e.key == 'ArrowRight') && updateValue(1);
    (e.key == 'ArrowDown' || e.key == 'ArrowLeft') && updateValue(-1);
  };
</script>

<td {colspan} {rowspan}>
  <div class="flex flex-row items-center justify-center">
    {#if optional}
      <div
        class="tooltip mr-2 h-6 w-6"
        data-tip={checked ? 'uncheck to remove date' : 'check to add date'}
      >
        <input type="checkbox" bind:checked class="checkbox" />
      </div>
    {/if}
    <div class="join">
      <button
        class="btn btn-ghost focus:btn-outline join-item"
        on:click={() => updateValue(-1)}
        disabled={!checked}>-</button
      >

      <!-- eslint-disable svelte/no-reactive-reassign -->
      <input
        type="text"
        class="input disabled:text-opacity-20 join-item disabled:text-white"
        bind:value={inputValue}
        on:keydown={handleInput}
        disabled={!checked}
      />
      <button
        class="btn btn-ghost focus:btn-outline join-item"
        on:click={() => updateValue(1)}
        disabled={!checked}>+</button
      >
    </div>
  </div>
</td>
