import { CartAddRequest, CartResponse, Product, ProductDetail } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/product`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductDetails = async (
  productId: string,
): Promise<ProductDetail> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/product/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

export const addToCart = async (
  cartRequest: CartAddRequest,
): Promise<CartResponse> => {
  console.log("Sending to cart API:", cartRequest);
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartRequest),
    });
    const responseText = await response.text();
    console.log("Cart API response:", response.status, responseText);
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${responseText}`,
      );
    }
    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(
        `Failed to parse response: ${responseText} and: ${parseError}`,
      );
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
