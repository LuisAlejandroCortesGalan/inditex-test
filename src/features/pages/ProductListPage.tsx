import React, { useState } from "react";

import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { useProducts } from "../hooks/useProducts";
import ProductItem from "../productDetailComponents/ProductItem";
import ErrorBoundary from "../ui/ErrorBoundary";
import LoadingSpinner from "../ui/LoadindSpinner";
import SearchBar from "../ui/SearchBar";

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
