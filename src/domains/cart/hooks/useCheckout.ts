// src/domains/cart/hooks/useCheckout.ts
import { useToast } from "../../notifications/hooks/useToast";
import { useCart } from "../context/CartContext";
import { CheckoutHandler } from "../types/Cart";

export const useCheckout = (): CheckoutHandler => {
  const { clearCart } = useCart();
  const { showSuccess } = useToast();

  const handleCheckout = () => {
    clearCart();
    showSuccess("Thank you for your purchase!");
  };

  return { handleCheckout };
};
