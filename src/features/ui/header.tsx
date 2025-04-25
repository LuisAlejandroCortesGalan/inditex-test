import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/') {
      return <span>Home</span>;
    }
    
    if (path.startsWith('/product/')) {
      return (
        <>
          <Link to="/">Home</Link> / <span>Product Details</span>
        </>
      );
    }
    
    return null;
  };
  
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">Mobile Shop</Link>
        <div className="breadcrumbs">{getBreadcrumbs()}</div>
      </div>
      <div className="cart-icon ">
        <span className="cart-count">{cartCount}</span>
        <i className="fa fa-shopping-cart"></i>
      </div>
    </header>
  );
};

export default Header;