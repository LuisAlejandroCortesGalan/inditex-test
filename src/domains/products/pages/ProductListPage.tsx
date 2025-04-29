import React, { useState } from "react";

import ErrorBoundary from "../../../shared/components/ErrorBoundary";
import LoadingSpinner from "../../../shared/components/LoadindSpinner";
import SearchBar from "../../../shared/components/SearchBar";
import ProductItem from "../../products/components/ProductItem";
import { useFilteredProducts } from "../../products/hooks/useFilteredProducts";
import { useProducts } from "../../products/hooks/useProducts";

const ProductListPage: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | undefined>(
    undefined,
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const filteredProducts = useFilteredProducts(products, {
    searchTerm,
    sortBy,
    minPrice,
    maxPrice,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="error" aria-live="assertive">
        Failed to fetch products
      </div>
    );

  return (
    <div className="product-list-page">
      <div className="filters-container">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="sort-filter">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            className="sort-select"
            value={sortBy || ""}
            onChange={(e) =>
              setSortBy(
                e.target.value as "price-asc" | "price-desc" | undefined,
              )
            }
            aria-label="Sort products by price"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        <div className="price-filter">
          <label htmlFor="minPrice">Min Price:</label>
          <input
            id="minPrice"
            className="price-input"
            type="number"
            min="0"
            value={minPrice ?? ""}
            onChange={(e) =>
              setMinPrice(
                e.target.value ? parseFloat(e.target.value) : undefined,
              )
            }
            placeholder="Min"
            aria-label="Minimum price"
          />
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            id="maxPrice"
            className="price-input"
            type="number"
            min="0"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(
                e.target.value ? parseFloat(e.target.value) : undefined,
              )
            }
            placeholder="Max"
            aria-label="Maximum price"
          />
        </div>
      </div>

      <ErrorBoundary>
        <div className="products-grid">
          {!filteredProducts || filteredProducts.length === 0 ? (
            <div className="no-results" aria-live="polite">
              No products found
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default ProductListPage;
