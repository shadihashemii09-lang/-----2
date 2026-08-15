export type CategorySlug = "blouse" | "dress" | "trousers" | "coat" | "set";

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  description: string;
  details: string[];
  fabrics: string[];
  colors: ProductColor[];
  sizes: string[];
  art: string;
  accent: string;
  collection: CollectionSlug;
  featured?: boolean;
  isNew?: boolean;
}

export type CollectionSlug = "spring" | "summer" | "autumn";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  art: string;
  accent: string;
  productSlugs: string[];
}

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}
