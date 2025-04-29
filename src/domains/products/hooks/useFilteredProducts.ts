import { useMemo } from "react";

import { Product } from "../types";

interface FilterOptions {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc";
}

export const useFilteredProducts = (
  products: Product[] | undefined,
  options: FilterOptions,
) => {
  return useMemo(() => {
    if (!products) {
      return products;
    }

    let filteredProducts = [...products];

    if (options.searchTerm?.trim()) {
      const lowerCaseSearch = options.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.brand.toLowerCase().includes(lowerCaseSearch) ||
          product.model.toLowerCase().includes(lowerCaseSearch),
      );
    }

    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = parseFloat(product.price);
        if (isNaN(price)) return false;
        const minMatch =
          options.minPrice === undefined || price >= options.minPrice;
        const maxMatch =
          options.maxPrice === undefined || price <= options.maxPrice;
        return minMatch && maxMatch;
      });
    }

    if (options.sortBy) {
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (isNaN(priceA) || isNaN(priceB)) return 0;
        return options.sortBy === "price-asc"
          ? priceA - priceB
          : priceB - priceA;
      });
    }

    return filteredProducts;
  }, [products, options]);
};
