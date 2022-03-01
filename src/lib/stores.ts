import type { Product, Category, Feature, ProductFeature } from "@prisma/client";
import { writable, derived } from "svelte/store";

// We initialise the stores with an empty array to type the $store values.

let c: Category[];
let p: Product[];
let f: Feature[];
let pf: ProductFeature[];

// These stores contain the data in a flat array.
export const categories = writable(c);
export const products = writable(p);
export const features = writable(f);
export const productFeatures = writable(pf);

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
export const categoryTree = derived(categories, ($categories: Category[]) => {
    let base: HierarchicalCategory[] = $categories.filter(c => c.parent_id === null);
    buildTree($categories, base);
    return base
})