export interface CartContextType {
  cartCount: number;
  updateCartCount: (count: number) => void;
}
export interface CartProviderProps {
    children: ReactNode;
  }