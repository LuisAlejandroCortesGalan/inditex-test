import { useMutation } from "@tanstack/react-query";

import { useCart } from "../../cart/context/CartContext";
import { addToCart as addToCartAPI } from "../../products/services/productServices";
import { CartAddRequest } from "../../products/types/index";

export const useAddToCart = () => {
  const { addToCart } = useCart();

  return useMutation({
    mutationFn: (cartRequest: CartAddRequest) => addToCartAPI(cartRequest),
    onSuccess: (data, variables) => {
      addToCart(variables);
      if (data.count) {
        localStorage.setItem("cart_count", data.count.toString());
      }
    },
    onError: (error) => {
      console.error("Add to cart mutation error:", error);
    },
  });
};
