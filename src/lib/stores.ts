import type { Product, Category, Feature, ProductFeature, Release } from '$lib/prisma';
import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface SortableItem {
  id: number;
  name: string;
}

export interface Sortable<T extends SortableItem[]> extends Writable<T[]> {
  sort: (sorting: 'id' | 'name', direction: 'asc' | 'desc') => void;
}

const sortable = <T extends SortableItem>(content: T[]) => {
  const { subscribe, set, update } = writable(content);

  const sort = (sorting: 'id' | 'name', direction: 'asc' | 'desc') => {
    if (sorting === 'id') {
      update((c) =>
        c.sort((a, b) => {
          if (direction === 'asc') {
            return a.id - b.id;
          } else {
            return b.id - a.id;
          }
        })
      );
    } else if (sorting === 'name') {
      update((c) =>
        c.sort((a, b) => {
          if (direction === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        })
      );
    }
  };

  return {
    subscribe,
    set,
    update,
    sort
  };
};

// These stores contain the data in a flat array.
export const categories: Sortable<Category[]> = sortable([]);
export const products: Sortable<Product[]> = sortable([]);
export const features: Sortable<Feature[]> = sortable([]);
export const productFeatures: Writable<ProductFeature[]> = writable();
export const releases: Writable<Release[]> = writable();

// Filter Stores
export const categoryFilter: Writable<string> = writable();
export const productFilter: Writable<string> = writable();
export const featureFilter: Writable<string> = writable();

export const showUnusedCategories: Writable<boolean> = writable(true);
export const showUnusedProducts: Writable<boolean> = writable(true);
export const showUnusedFeatures: Writable<boolean> = writable(true);
export const showUnreleasedProductFeatures: Writable<boolean> = writable(true);

// Filtered stores
export const stringFilter = (store: any, filter: string) => {
  if (!store) return [];
  if (!filter) return store;
  return store.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
};

// This store filters out categories using the category fiter string. The remaining categories are filtered out of they have no associated children or features when showUnusedCategories is false.
export const filteredCategories = derived(
  [categories, categoryFilter, features, showUnusedCategories],
  ([$categories, $categoryFilter, $features, $showUnusedCategories]) => {
    // Stage 1: Filter out categories based on string filter
    const categories = stringFilter($categories, $categoryFilter);

    if ($showUnusedCategories) {
      return categories;
    }

    // Stage 2: Filter out categories with no children or features
    return categories.filter(
      (category: Category) =>
        categories.some((child: Category) => child.parent_id === category.id) ||
        $features.some((feature) => feature.category_id === category.id)
    );
  }
);

export const filteredProducts = derived(
  [products, productFilter, productFeatures, showUnusedProducts],
  ([$products, $productFilter, $productFeatures, $showUnusedProducts]) => {
    // Stage 1: Filter out products based on string filter
    const products = stringFilter($products, $productFilter);

    if ($showUnusedProducts) {
      return products;
    }

    // Stage 2: Filter out products with no productFeatures
    return products.filter((product: Product) =>
      $productFeatures.some((productFeature) => productFeature.product_id === product.id)
    );
  }
);

export const filteredFeatures = derived(
  [features, featureFilter, productFeatures, showUnusedFeatures],
  ([$features, $featureFilter, $productFeatures, $showUnusedFeatures]) => {
    // Stage 1: Filter out features based on string filter
    stringFilter($features, $featureFilter);

    if ($showUnusedFeatures) {
      return $features;
    }

    // Stage 2: Filter out features with no productFeatures
    return $features.filter((feature: Feature) =>
      $productFeatures.some((productFeature) => productFeature.feature_id === feature.id)
    );
  }
);

// HierarchicalCategory extends the category type with an array of children.
export type HierarchicalCategory = Category & { children?: HierarchicalCategory[] };

// This function recursively builds up a tree of categories.
const buildTree = (array: HierarchicalCategory[], base: HierarchicalCategory[]) => {
  return base.reduce((acc, item) => {
    item.children = array.filter((child) => child.parent_id === item.id);
    item.children = buildTree(array, item.children);
    return [...acc, item];
  }, []);
};

// This store contains an up-to-date tree of categories.
export const categoryTree = derived(filteredCategories, ($categories: Category[]) => {
  let base: HierarchicalCategory[] = $categories.filter((c) => c.parent_id === null);
  buildTree($categories, base);
  return base;
});

// This store contains a list of all categories with a recursive array of parents.
export const categoriesWithParents = derived(categories, ($categories: Category[]) => {
  return $categories.map((category) => {
    const parents = [];
    let parent = category;
    while (parent.parent_id) {
      parent = $categories.find((c) => c.id === parent.parent_id);
      parents.push(parent.name);
    }
    parents.reverse();
    return { id: category.id, name: category.name, parents };
  });
});

// This store contains a list of all features with a recursive array of parents.
export const featuresWithParents = derived([categories, features], ([$categories, $features]) => {
  return $features
    .map((feature) => {
      const parents = [];
      let parent: Category;
      if (feature.category_id) {
        parent = $categories.find((c) => c.id === feature.category_id);
        parents.push(parent.name);
        while (parent.parent_id) {
          parent = $categories.find((c) => c.id === parent.parent_id);
          parents.push(parent.name);
        }
      }
      parents.reverse();
      return { id: feature.id, name: feature.name, parents };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
});
