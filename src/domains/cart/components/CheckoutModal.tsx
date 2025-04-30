import React from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalPrice: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalPrice,
}) => {
  return (
    <div
      className={`checkout-modal ${isOpen ? "active" : ""}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="checkout-modal-content">
        <div className="checkout-modal-header">
          <h2 className="checkout-modal-title">Confirm Purchase</h2>
          <button
            onClick={onClose}
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
          <button onClick={onClose} className="checkout-modal-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="checkout-modal-confirm">
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
