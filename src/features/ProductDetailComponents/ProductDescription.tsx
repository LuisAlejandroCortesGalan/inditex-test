import React from "react";

import { ProductDescriptionProps } from "../Types/productItem";

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className="product-description">
      <h2>
        {product.brand} {product.model}
      </h2>
      <p className="product-price">€{product.price}</p>

      <div className="product-specs">
        <h3>Specifications</h3>
        <ul>
          <li>
            <span className="spec-label">CPU:</span>
            <span className="spec-value">{product.cpu}</span>
          </li>
          <li>
            <span className="spec-label">RAM:</span>
            <span className="spec-value">{product.ram}</span>
          </li>
          <li>
            <span className="spec-label">Operating System:</span>
            <span className="spec-value">{product.os}</span>
          </li>
          <li>
            <span className="spec-label">Screen Resolution:</span>
            <span className="spec-value">{product.displayResolution}</span>
          </li>
          <li>
            <span className="spec-label">Battery:</span>
            <span className="spec-value">{product.battery}</span>
          </li>
          <li>
            <span className="spec-label">Cameras:</span>
            <span className="spec-value">
              {Array.isArray(product.primaryCamera)
                ? product.primaryCamera.join(", ")
                : product.primaryCamera}{" "}
              (Primary),{" "}
              {Array.isArray(product.secondaryCmera)
                ? product.secondaryCmera.join(", ")
                : product.secondaryCmera}{" "}
              (Secondary)
            </span>
          </li>
          <li>
            <span className="spec-label">Dimensions:</span>
            <span className="spec-value">{product.dimentions}</span>
          </li>
          <li>
            <span className="spec-label">Weight:</span>
            <span className="spec-value">{product.weight}g</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;
