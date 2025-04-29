import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useCart } from "../../domains/cart/context/CartContext";
import { Product, CartAddRequest } from "../../domains/products/types";

const Header: React.FC = () => {
  const { cartCount, cartItems, getProductById, removeFromCart } = useCart();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<(Product | null)[]>([]);

  // Group cartItems by id, colorCode, storageCode
  const groupedCartItems = cartItems.reduce(
    (acc, item, index) => {
      const key = `${item.id}-${item.colorCode}-${item.storageCode}`;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 0, indices: [] };
      }
      acc[key].quantity += 1;
      acc[key].indices.push(index);
      return acc;
    },
    {} as Record<
      string,
      CartAddRequest & { quantity: number; indices: number[] }
    >,
  );

  const groupedItemsArray: (CartAddRequest & {
    quantity: number;
    indices: number[];
  })[] = Object.values(groupedCartItems);

  // Fetch product details for unique product IDs
  useEffect(() => {
    const fetchProducts = async () => {
      const uniqueIds = Array.from(new Set(cartItems.map((item) => item.id)));
      const productPromises = uniqueIds.map((id) => getProductById(id));
      const fetchedProducts: Product[] = await Promise.all(productPromises);
      const productMap = Object.fromEntries(
        fetchedProducts.map((product) => [product.id, product]),
      );
      const orderedProducts = groupedItemsArray.map(
        (item) => productMap[item.id] || null,
      );
      setProducts(orderedProducts);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, getProductById]);

  const calculateTotalPrice = (): number => {
    return groupedItemsArray.reduce((total, item, index) => {
      const product = products[index];
      if (!product || !product.price) return total;
      const price = parseFloat(product.price);
      if (isNaN(price)) return total;
      return total + price * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === "/") {
      return "Home";
    }
    if (path.startsWith("/product/")) {
      return (
        <span className="breadcrumbs">
          <Link to="/">Home</Link> / Product Details
        </span>
      );
    }
    return null;
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveUnit = (indices: number[]) => {
    const lastIndex = indices[indices.length - 1];
    removeFromCart(lastIndex);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <h1>
            <Link to="/" className="logo">
              Mobile Shop
            </Link>
          </h1>
          <nav>{getBreadcrumbs()}</nav>
        </div>
        <div className="cart-icon">
          <button
            onClick={toggleCart}
            className="cart-icon"
            aria-label="View cart"
          >
            <i className="fa fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>

        <div className={`cart-modal ${isCartOpen ? "active" : ""}`}>
          <div className="cart-modal-content">
            <div className="cart-modal-header">
              <h2 className="cart-modal-title">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="cart-modal-close"
                aria-label="Close cart"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            {groupedItemsArray.length === 0 ? (
              <p className="cart-empty">Your cart is empty.</p>
            ) : (
              <div>
                {groupedItemsArray.map((item, index) => {
                  const product = products[index];
                  if (!product) return null;
                  return (
                    <div
                      className="cart-item"
                      key={`${item.id}-${item.colorCode}-${item.storageCode}`}
                    >
                      <img
                        src={product.imgUrl}
                        alt={`${product.brand} ${product.model}`}
                      />
                      <div className="cart-item-details">
                        <h3 className="cart-item-name">
                          {product.brand} {product.model}
                        </h3>
                        <p className="cart-item-specs">
                          Color: {item.colorCode} | Storage: {item.storageCode}
                        </p>
                        <p className="cart-item-price">
                          ${parseFloat(product.price)}
                        </p>
                        <p className="cart-item-quantity">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveUnit(item.indices)}
                        className="cart-item-remove"
                        aria-label="Remove one unit"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  );
                })}
                <div className="cart-total">
                  <p>
                    <strong>Total:</strong> ${totalPrice}
                  </p>
                </div>
                <Link
                  to="/checkout"
                  onClick={toggleCart}
                  className="cart-checkout-button"
                >
                  Go to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
