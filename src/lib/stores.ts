import type { Product, Category, Feature, ProductFeature } from "@prisma/client";
import { writable, derived } from "svelte/store";

// We initialise the stores with an empty array to type the $store values.

let c: Category[];
let p: Product[];
let f: Feature[];
let pf: ProductFeature[];

export const categories = writable(c);
export const products = writable(p);
export const features = writable(f);
export const productFeatures = writable(pf);

type HierarchicalCategory = Category & { children?: Category[] }
// extended category type with array of children

export const categoryTree = derived(categories, ($categories: Category[]) => {
    if ($categories.length < 0) {
        $categories.reduce((tree, category) => {
            if (category.parent_id === null) {
                tree.push(category);
            } else {
                const parent: HierarchicalCategory = $categories.find((c) => c.id === category.parent_id);
                if (parent.children === undefined) {
                    parent.children = [];
                }
                parent.children.push(category);
            }
            return tree;
        }, []);
    } else return [];
})