import React, { createContext, useContext, useState, useEffect } from "react";

import { CartAddRequest, Product } from "src/domains/products/types";

import { CartContextType } from "../types/cartContext";

const CartContext = createContext<CartContextType | undefined>(undefined);
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartAddRequest[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart_items");
      if (!stored) return;

      const { items, timestamp } = JSON.parse(stored);
      const oneWeek = 1000 * 60 * 60;
      if (!timestamp || Date.now() - timestamp > oneWeek) {
        localStorage.removeItem("cart_items");
        return;
      }

      setCartItems(Array.isArray(items) ? items.slice(0, 50) : []);
    } catch (error) {
      console.error("Failed to parse cart_items:", error);
      localStorage.removeItem("cart_items");
    }
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cart_items");
      return;
    }
    localStorage.setItem(
      "cart_items",
      JSON.stringify({ items: cartItems, timestamp: Date.now() }),
    );
  }, [cartItems]);

  const addToCart = (item: CartAddRequest) => {
    console.log("Adding to cart:", item);
    setCartItems((prevItems) => [...prevItems, item].slice(0, 50));
  };

  const removeFromCart = (index: number) => {
    console.log("Removing item at index:", index);
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setCartItems([]);
    localStorage.removeItem("cart_items");
  };

  const getProductById = async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE}/api/product/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
      return await response.json();
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
        cartCount: cartItems.length,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
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
