import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { products as defaultProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('admin-products');
      if (storedProducts) {
        try {
          const parsedProducts = JSON.parse(storedProducts);
          setProducts(parsedProducts);
        } catch (error) {
          console.error('Error parsing stored products:', error);
          setProducts(defaultProducts);
        }
      } else {
        setProducts(defaultProducts);
      }
    };

    loadProducts();

    // Listen for storage changes (in case admin updates in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-products') {
        loadProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return products;
};