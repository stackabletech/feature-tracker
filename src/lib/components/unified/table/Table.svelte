<script lang="ts">
</script>

<table class="table">
  <thead class="bg-base-100">
    <slot name="head" />
  </thead>
  <tbody>
    <slot />
  </tbody>
  <tfoot>
    <slot name="foot" />
  </tfoot>
</table>

<style>
  .table :global(thead tr th) {
    position: sticky;
    top: 0;
    z-index: 8;
  }

  .table :global(thead tr th:first-child) {
    position: sticky;
    top: 0;
    z-index: 25;
  }

  .table :global(thead tr:first-child th:not(:first-child)) {
    position: relative;
    z-index: 5;
  }

  .table :global(tr th:first-child) {
    position: sticky;
    left: 0;
    z-index: 20;
  }
</style>
