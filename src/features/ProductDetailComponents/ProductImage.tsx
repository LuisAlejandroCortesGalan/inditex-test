import React from 'react';
import { ProductImageProps } from '../types/productItem';

const ProductImage: React.FC<ProductImageProps> = ({ imgUrl, brand, model }) => {
  return (
    <div className="product-detail-image">
      <img src={imgUrl} alt={`${brand} ${model}`} />
    </div>
  );
};

export default ProductImage;