export type Product = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: 'phones' | 'accessories';
  description: string;
  price: number;
  compareAtPrice?: number;
  colors: {
    name: string;
    hex: string;
    images: string[];
  }[];
  images: string[];
  inStock: boolean;
  badges?: string[];
  specs?: Record<string, string>;
  rating?: number;
  variants?: {
    storage?: string;
    color?: string;
    sku?: string;
  }[];
};

// Import JSON data and properly type it
import productsData from './products.json';

export const products: Product[] = productsData as unknown as Product[];