import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useCart } from "../../domains/cart/context/CartContext";
import { useCartLogic } from "../../domains/cart/hooks/useCartLogic";
import { getBreadcrumbs } from "../utils/breadcrumbs";

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const {
    groupedItemsArray,
    products,
    totalPrice,
    isLoading,
    error,
    removeCartItem,
  } = useCartLogic();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
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
          <nav>{getBreadcrumbs(location.pathname)}</nav>
        </div>
        <div className="cart-icon">
          <button
            onClick={toggleCart}
            className="cart-icon"
            aria-label="View cart"
          >
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            <span className="sr-only">Cart</span>
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
                <i className="fa fa-times" aria-hidden="true"></i>
                <span className="sr-only">Close</span>
              </button>
            </div>
            {error ? (
              <p className="cart-error">Error: {error}</p>
            ) : isLoading ? (
              <p className="cart-loading">Loading products...</p>
            ) : groupedItemsArray.length === 0 ? (
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
                          ${parseFloat(product.price).toFixed(2)}
                        </p>
                        <p className="cart-item-quantity">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          console.log(
                            "Delete button clicked for indices:",
                            item.indices,
                          );
                          removeCartItem(item.indices);
                        }}
                        className="cart-item-remove"
                        aria-label={`Remove one ${product.brand} ${product.model} from cart`}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                  );
                })}
                <div className="cart-total">
                  <p>
                    <strong>Total:</strong> ${totalPrice.toFixed(2)}
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
