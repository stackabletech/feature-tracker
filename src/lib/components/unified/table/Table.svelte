<script lang="ts">
</script>

<table class="table-xs table-pin-rows table-pin-cols table">
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
