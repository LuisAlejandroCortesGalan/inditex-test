// src/shared/components/Header.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import CartModal from "../../domains/cart/components/CartModal";
import CheckoutModal from "../../domains/cart/components/CheckoutModal";
import {
  CartState,
  CartLogic,
  CheckoutHandler,
} from "../../domains/cart/types/Cart";
import { getBreadcrumbs } from "../utils/breadcrumbs";

interface HeaderProps extends CartState, CartLogic, CheckoutHandler {}

const Header: React.FC<HeaderProps> = ({
  cartCount,
  groupedItemsArray,
  products,
  totalPrice,
  isLoading,
  error,
  removeCartItem,
  handleCheckout,
}) => {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

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

        <CartModal
          isOpen={isCartOpen}
          onClose={toggleCart}
          onCheckout={() => setIsCheckoutModalOpen(true)}
          groupedItemsArray={groupedItemsArray}
          products={products}
          totalPrice={totalPrice}
          isLoading={isLoading}
          error={error}
          removeCartItem={removeCartItem}
        />

        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          onConfirm={() => {
            handleCheckout();
            setIsCartOpen(false);
            setIsCheckoutModalOpen(false);
          }}
          totalPrice={totalPrice}
        />
      </div>
    </header>
  );
};

export default Header;
