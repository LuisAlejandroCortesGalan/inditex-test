import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { useAddToCart } from "../../cart/hooks/useAddToCart";
import { useToast } from "../../notifications/hooks/useToast";
import { ColorOption, StorageOption } from "../types";
import { ProductActionsProps } from "../types/productItem";
import "react-toastify/dist/ReactToastify.css";

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { showSuccess, showError } = useToast();
  const [selectedStorage, setSelectedStorage] = useState(
    product.options?.storages?.[0]?.code || 0,
  );
  const [selectedColor, setSelectedColor] = useState(
    product.options?.colors?.[0]?.code || 0,
  );

  const { mutate: addToCartMutation, isPending } = useAddToCart();

  const handleAddToCart = async () => {
    const cartRequest = {
      id: product.id,
      colorCode: selectedColor,
      storageCode: selectedStorage,
    };
    addToCartMutation(cartRequest, {
      onSuccess: () => {
        showSuccess("Product added to cart!");
      },
      onError: (error: Error) => {
        console.error("Add to cart error:", error);
        showError(`Failed to add product to cart: ${error.message}`);
      },
    });
  };

  return (
    <div className="product-actions">
      <div className="option-selector">
        <h3>Storage</h3>
        <select
          value={selectedStorage}
          onChange={(e) => setSelectedStorage(Number(e.target.value))}
          aria-label="Select storage option"
        >
          {product.options?.storages?.map((storage: StorageOption) => (
            <option key={storage.code} value={storage.code}>
              {storage.name}
            </option>
          ))}
        </select>
      </div>

      <div className="option-selector">
        <h3>Color</h3>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(Number(e.target.value))}
          aria-label="Select color option"
        >
          {product.options?.colors?.map((color: ColorOption) => (
            <option key={color.code} value={color.code}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="add-to-cart-button"
        onClick={handleAddToCart}
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </button>

      <ToastContainer />
    </div>
  );
};

export default ProductActions;
