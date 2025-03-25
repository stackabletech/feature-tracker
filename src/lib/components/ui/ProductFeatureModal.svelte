<script lang="ts">
  import { marked } from 'marked';
  import Modal from './Modal.svelte';
  import Cell from '../crud/cells/Cell.svelte';
  import { InfoIcon, EditIcon, XCircleIcon, SaveIcon } from 'svelte-feather-icons';
  import ImplementationIcon from '$lib/components/ui/ImplementationIcon.svelte';

  import { getContext, createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { info, danger } from '$lib/util/alert';

  import { productFeatures, releases } from '$lib/stores';
  import type { Feature, Product, ProductFeature } from '@prisma/client';

  const dispatch = createEventDispatcher();
  let editable: Writable<boolean> = getContext('editable');
  let editMode: boolean = $editable;

  export let product: Product;
  export let feature: Feature;
  export let productFeature: ProductFeature;

  $: release = productFeature && $releases.find((r) => r.id === productFeature.release_id);

  let toggleEditMode = () => (editMode = !editMode);

  let save = async () => {
    const res = await fetch(`/api/product_features/${productFeature.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productFeature)
    });

    if (res.status === 200) {
      const patchedProductFeature: ProductFeature = await res.json();
      info('Patched Product Feature #' + patchedProductFeature.id);
      $productFeatures = [
        ...$productFeatures.map((obj) =>
          obj.id == patchedProductFeature.id ? patchedProductFeature : obj
        )
      ];
      return dispatch('close');
    } else {
      danger(`${res.status}: ${res.statusText}`);
    }
  };

  $: title = productFeature
    ? productFeature.implementation_status == 'NOT_AVAILABLE'
      ? 'N/A'
      : productFeature.id
    : 'N/A';
</script>

<Modal on:close>
  <svelte:fragment slot="title">
    <InfoIcon size="18" class="my-auto mr-2" />
    <h3 class="my-auto font-bold">
      Details: Product Feature #{title}
    </h3>
  </svelte:fragment>
  <main class="flex flex-col gap-2">
    {#if editMode}
      <table class="no-hover table table-xs">
        <tbody>
          <tr>
            <td>Product:</td>
            <Cell type="product_id" bind:value={productFeature.product_id} />
          </tr>
          <tr>
            <td>Feature:</td>
            <Cell type="feature_id" bind:value={productFeature.feature_id} />
          </tr>
          {#if productFeature}
            <tr>
              <td>Status:</td>
              <Cell type="implementation_status" bind:value={productFeature.implementation_status} />
            </tr>
            <tr>
              <td>Release:</td>
              <Cell type="release_id" bind:value={productFeature.release_id} />
            </tr>
            <tr>
              <td>Note:</td>
              <Cell type="note" bind:value={productFeature.note} />
            </tr>
          {/if}
        </tbody>
      </table>
    {:else}
      <table class="no-hover table-xs inline-table">
        <tbody>
          <tr>
            <td>Product:</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Feature:</td>
            <td>{feature.name}</td>
          </tr>
          {#if productFeature}
            <tr>
              <td> Status:</td>
              <td>
                <div class="flex flex-row">
                  <ImplementationIcon
                    class="mr-2"
                    status={productFeature.implementation_status}
                    released={release?.released ? true : false}
                  />
                  {productFeature.implementation_status}
                </div>
              </td>
            </tr>
            <tr>
              <td>Release:</td>
              <td
                >{release?.name || 'No release'} ({release?.released ? 'released' : 'unreleased'})
              </td>
            </tr>
            {#if release?.date}
              <tr>
                <td>{release.released ? 'Released on:' : 'Expected release date:'}</td>
                <td>{new Date(release.date).toLocaleDateString()}</td>
              </tr>
            {/if}
            {#if productFeature.note}
              <tr>
                <td>Note:</td>
                <td />
              </tr>
              <tr>
                <td colspan="2">
                  <div
                    class="prose max-h-72 overflow-y-auto whitespace-normal rounded-md bg-base-100 p-2 prose-h1:text-lg prose-h2:text-sm"
                  >
                    {@html marked.parse(productFeature.note)}
                  </div>
                </td>
              </tr>
            {/if}
          {:else}
            <tr>
              <td> Status:</td>
              <td>
                <div class="flex flex-row justify-center">
                  <ImplementationIcon
                    class="mr-2"
                    status={'NOT_AVAILABLE'}
                    released={release?.released ? true : false}
                  />
                  {'NOT_AVAILABLE'}
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    {/if}
    {#if $editable}
      <div class="mt-4 flex flex-row justify-end">
        {#if editMode}
          <button class="btn btn-circle btn-ghost btn-sm" on:click={save}>
            <SaveIcon size="16" />
          </button>
          <button class="btn btn-circle btn-ghost btn-sm" on:click={toggleEditMode}>
            <XCircleIcon size="16" />
          </button>
        {:else}
          <button class="btn btn-circle btn-ghost btn-sm" on:click={toggleEditMode}>
            <EditIcon size="16" />
          </button>
        {/if}
      </div>
    {/if}
  </main>
</Modal>

<style>
  /* Unset the table hover style applied by DaisyUI */
  :global(table.no-hover td) {
    background-color: unset !important;
  }
</style>
