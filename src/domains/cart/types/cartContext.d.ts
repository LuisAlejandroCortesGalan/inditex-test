export interface CartProviderProps {
  children: ReactNode;
}

export interface CartContextType {
  cartCount: number;
  cartItems: CartAddRequest[];
  addToCart: (item: CartAddRequest) => void;
  removeFromCart: (index: number) => void;
  getProductById: (id: string) => Promise<Product>;
  clearCart: () => void;
}
