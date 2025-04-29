import { useState, useEffect, useMemo } from "react";

import { useCart } from "../../../domains/cart/context/CartContext";
import { useToast } from "../../notifications/hooks/useToast";
import { Product, CartAddRequest } from "../../products/types/index";

interface GroupedCartItem extends CartAddRequest {
  quantity: number;
  indices: number[];
}

export const useCartLogic = () => {
  const { cartItems, getProductById, removeFromCart } = useCart();
  const { showSuccess } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const groupedCartItems = useMemo(() => {
    return cartItems.reduce(
      (acc, item, index) => {
        const key = `${item.id}-${item.colorCode}-${item.storageCode}`;
        if (!acc[key]) {
          acc[key] = { ...item, quantity: 0, indices: [] };
        }
        acc[key].quantity += 1;
        acc[key].indices.push(index);
        return acc;
      },
      {} as Record<string, GroupedCartItem>,
    );
  }, [cartItems]);

  const groupedItemsArray: GroupedCartItem[] = useMemo(
    () => Object.values(groupedCartItems),
    [groupedCartItems],
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const uniqueIds = Array.from(new Set(cartItems.map((item) => item.id)));
        const productPromises = uniqueIds.map((id) => getProductById(id));
        const fetchedProducts: (Product | null)[] =
          await Promise.all(productPromises);
        setProducts(
          fetchedProducts.filter(
            (p: Product | null): p is Product => p !== null,
          ),
        );
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cartItems, getProductById]);

  const totalPrice = useMemo(() => {
    return groupedItemsArray.reduce((total, item, index) => {
      const product = products[index];
      if (!product || !product.price) return total;
      const price = parseFloat(product.price);
      if (isNaN(price)) return total;
      return total + price * item.quantity;
    }, 0);
  }, [groupedItemsArray, products]);

  const removeCartItem = (indices: number[]) => {
    const lastIndex = indices[indices.length - 1];
    const item = cartItems[lastIndex];
    const product = products.find((p) => p.id === item.id);
    removeFromCart(lastIndex);
    showSuccess(
      product
        ? `Removed ${product.brand} ${product.model} from cart`
        : "Item removed from cart",
    );
  };

  return {
    groupedItemsArray,
    products,
    totalPrice,
    isLoading,
    error,
    removeCartItem,
  };
};
