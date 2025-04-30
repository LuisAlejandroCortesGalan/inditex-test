export interface CartItem {
    id: string;
    colorCode: string;
    storageCode: string;
    quantity: number;
    indices: number[];
  }
  
  export interface Product {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl: string;
  }
  
  export interface CartState {
    cartCount: number;
    clearCart: () => void;
  }
  
  export interface CartLogic {
    groupedItemsArray: CartItem[];
    products: Product[];
    totalPrice: number;
    isLoading: boolean;
    error: string | null;
    removeCartItem: (indices: number[]) => void;
  }
  
  export interface CheckoutHandler {
    handleCheckout: () => void;
  }