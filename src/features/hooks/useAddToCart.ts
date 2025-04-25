import { useMutation } from '@tanstack/react-query';
import { addToCart } from '../api/services';
import { CartAddRequest } from '../types';

export const useAddToCart = () => {

  return useMutation({
    mutationFn: (cartRequest: CartAddRequest) => addToCart(cartRequest),
    onSuccess: (data) => {
      localStorage.setItem('cart_count', data.count.toString());
    },
  });
};