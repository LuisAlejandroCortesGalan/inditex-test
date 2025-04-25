import { useMutation } from '@tanstack/react-query';
import { addToCart as addToCartAPI } from '../api/services';
import { CartAddRequest } from '../types';
import { useCart } from '../context/CartContext';

export const useAddToCart = () => {
  const { addToCart } = useCart();

  return useMutation({
    mutationFn: (cartRequest: CartAddRequest) => addToCartAPI(cartRequest),
    onSuccess: (data, variables) => {
      console.log('Add to cart success:', data, variables);
      addToCart(variables);
      if (data.count) {
        localStorage.setItem('cart_count', data.count.toString());
      }
    },
    onError: (error) => {
      console.error('Add to cart mutation error:', error);
    },
  });
};