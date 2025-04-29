import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useCart } from "../../domains/cart/context/CartContext";
import { useCartLogic } from "../../domains/cart/hooks/useCartLogic";
import { useToast } from "../../domains/notifications/hooks/useToast";
import { getBreadcrumbs } from "../utils/breadcrumbs";

import LoadingSpinner from "./LoadindSpinner";

const Header: React.FC = () => {
  const { cartCount, clearCart } = useCart();
  const {
    groupedItemsArray,
    products,
    totalPrice,
    isLoading,
    error,
    removeCartItem,
  } = useCartLogic();
  const { showSuccess } = useToast();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    clearCart();
    setIsCartOpen(false);
    setIsCheckoutModalOpen(false);
    showSuccess("Thank you for your purchase!");
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

        {/* Cart Modal */}
        <div
          className={`cart-modal ${isCartOpen ? "active" : ""}`}
          role="dialog"
          aria-modal="true"
        >
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
              <LoadingSpinner />
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
                        onClick={() => removeCartItem(item.indices)}
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
                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="cart-checkout-button"
                  disabled={groupedItemsArray.length === 0}
                >
                  Go to Checkout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Confirmation Modal */}
        <div
          className={`checkout-modal ${isCheckoutModalOpen ? "active" : ""}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="checkout-modal-content">
            <div className="checkout-modal-header">
              <h2 className="checkout-modal-title">Confirm Purchase</h2>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="checkout-modal-close"
                aria-label="Close checkout confirmation"
              >
                <i className="fa fa-times" aria-hidden="true"></i>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="checkout-modal-body">
              <p>Are you sure you want to complete your purchase?</p>
              <p>
                <strong>Total:</strong> ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="checkout-modal-footer">
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="checkout-modal-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="checkout-modal-confirm"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
