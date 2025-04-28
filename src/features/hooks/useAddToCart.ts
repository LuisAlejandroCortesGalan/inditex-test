import { useMutation } from "@tanstack/react-query";

import { addToCart as addToCartAPI } from "../Api/services";
import { useCart } from "../Context/CartContext";
import { CartAddRequest } from "../Types";

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
