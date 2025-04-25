import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartContextType, CartProviderProps } from '../types/cartContext';
  

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem('cart_count');
    if (storedCount) {
      setCartCount(parseInt(storedCount, 10));
    }
  }, []);

  const updateCartCount = (count: number) => {
    setCartCount(count);
    localStorage.setItem('cart_count', count.toString());
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};