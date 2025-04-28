import React, { createContext, useContext, useState, useEffect } from "react";

import { CartAddRequest, Product } from "../types";
import { CartContextType } from "../types/cartContext";

const CartContext = createContext<CartContextType | undefined>(undefined);
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartAddRequest[]>(() => {
    const items = JSON.parse(localStorage.getItem("cart_items") || "[]");
    console.log("Initialized cartItems from localStorage:", items);
    return items;
  });

  const cartCount = cartItems.length;

  // Sync localStorage when cartItems change
  useEffect(() => {
    console.log("Saving cartItems to localStorage:", cartItems);
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartAddRequest) => {
    console.log("Adding to cart:", item);
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (index: number) => {
    console.log("Removing item at index:", index);
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const getProductById = async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE}/api/product/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      return {
        id,
        brand: "Unknown Brand",
        model: "Unknown Model",
        price: "0",
        imgUrl: "https://placehold.co/80x80?text=IMG",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        addToCart,
        removeFromCart,
        getProductById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
