import React from "react";

import LoadingSpinner from "../../../shared/components/LoadindSpinner";
import { CartLogic } from "../types/Cart";

interface CartModalProps extends CartLogic {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  onCheckout,
  groupedItemsArray,
  products,
  totalPrice,
  isLoading,
  error,
  removeCartItem,
}) => {
  return (
    <div
      className={`cart-modal ${isOpen ? "active" : ""}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="cart-modal-content">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">Your Cart</h2>
          <button
            onClick={onClose}
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
              onClick={onCheckout}
              className="cart-checkout-button"
              disabled={groupedItemsArray.length === 0}
            >
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
