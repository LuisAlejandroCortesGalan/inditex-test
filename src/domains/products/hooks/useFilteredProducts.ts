import { useMemo } from "react";

import { Product } from "../types";

export const useFilteredProducts = (
  products: Product[] | undefined,
  searchTerm: string,
) => {
  return useMemo(() => {
    if (!products || !searchTerm.trim()) {
      return products;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.brand.toLowerCase().includes(lowerCaseSearch) ||
        product.model.toLowerCase().includes(lowerCaseSearch),
    );
  }, [products, searchTerm]);
};
