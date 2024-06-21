<script lang="ts">
</script>

<div class="max-w-full overflow-auto">
  <table class="table-xs table">
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
</div>
