import type { Product, Category, Feature, ProductFeature } from "$lib/prisma";
import { writable, derived } from "svelte/store";
import type { Writable } from 'svelte/store';

// These stores contain the data in a flat array.
export const categories: Writable<Category[]> = writable();
export const products: Writable<Product[]> = writable();
export const features: Writable<Feature[]> = writable();
export const productFeatures: Writable<ProductFeature[]> = writable();

// Filter Stores
export const categoryFilter: Writable<string> = writable();
export const productFilter: Writable<string> = writable();
export const featureFilter: Writable<string> = writable();

// Filtered stores
export const filter = (store: any, filter: string) => {
    if (!store) return [];
    if (!filter) return store;
    return store.filter(
        (item: { name: string }) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
    );
}

export const filteredCategories = derived([categories, categoryFilter],
    ([$categories, $categoryFilter]) => filter($categories, $categoryFilter)
);

export const filteredProducts = derived([products, productFilter],
    ([$products, $productFilter]) => filter($products, $productFilter)
);

export const filteredFeatures = derived([features, featureFilter],
    ([$features, $featureFilter]) => filter($features, $featureFilter)
);

// HierarchicalCategory extends the category type with an array of children.
export type HierarchicalCategory = Category & { children?: HierarchicalCategory[] }

// This function recursively builds up a tree of categories.
const buildTree = (array: HierarchicalCategory[], base: HierarchicalCategory[]) => {
    return base.reduce((acc, item) => {
        item.children = array.filter(child => child.parent_id === item.id);
        item.children = buildTree(array, item.children);
        return [...acc, item];
    }, []);
}

// This store contains an up-to-date tree of categories.
export const categoryTree = derived(filteredCategories, ($categories: Category[]) => {
    let base: HierarchicalCategory[] = $categories.filter(c => c.parent_id === null);
    buildTree($categories, base);
    return base
})