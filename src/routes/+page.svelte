<script lang="ts">
  import { categories, products, features, productFeatures } from '$lib/stores';
</script>

<main class="bg-launch grid grow place-items-center bg-bottom bg-no-repeat">
  <div class="stats stats-vertical md:stats-horizontal shadow-sm">
    <div class="stat">
      <div class="stat-title">Features</div>
      <div class="stat-value">{$features.length}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Categories</div>
      <div class="stat-value">{$categories.length}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Products</div>
      <div class="stat-value">{$products.length}</div>
    </div>
    <div class="stat">
      <div class="stat-title text-secondary">Product Features</div>
      <div class="stat-value text-secondary">{$productFeatures.length}</div>
    </div>
  </div>
</main>
