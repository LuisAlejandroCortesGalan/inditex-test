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

  const filteredProducts = useFilteredProducts(products, searchTerm);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="error" aria-live="assertive">
        Failed to fetch products
      </div>
    );

  return (
    <div className="product-list-page">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

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
