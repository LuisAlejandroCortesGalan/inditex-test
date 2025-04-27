import React from "react";
import { useParams, Link } from "react-router-dom";

import { useProductDetails } from "../Hooks/useProductDetails";
import ProductActions from "../ProductDetailComponents/ProductActions";
import ProductDescription from "../ProductDetailComponents/ProductDescription";
import ProductImage from "../ProductDetailComponents/ProductImage";
import ErrorBoundary from "../Ui/ErrorBoundary";
import LoadingSpinner from "../Ui/LoadindSpinner";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductDetails(id || "");

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="error" aria-live="assertive">
        Failed to fetch product details
      </div>
    );
  if (!product)
    return (
      <div className="error" aria-live="assertive">
        Product not found
      </div>
    );

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <ErrorBoundary>
        <div className="product-detail-content">
          <div className="product-detail-left">
            <ProductImage
              imgUrl={product.imgUrl}
              brand={product.brand}
              model={product.model}
            />
          </div>
          <div className="product-detail-right">
            <ProductDescription product={product} />
            <ProductActions product={product} />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default ProductDetailPage;
