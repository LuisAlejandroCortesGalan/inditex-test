import React from "react";
import { Link } from "react-router-dom";

import { ProductItemProps } from "../Types/productItem";

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <h3 className="product-brand">{product.brand}</h3>
          <h4 className="product-model">{product.model}</h4>
          <p className="product-price">€{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
