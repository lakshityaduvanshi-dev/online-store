import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ setView, setSearchQuery, setSelectedCategory }) {
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Simple test trigger to grant admin visibility access (email target check)
  const isAdmin = user && (user.email === 'admin@store.com' || user.name.toLowerCase().includes('admin'));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3 shadow-sm">
      <div className="container">
        <span 
          className="navbar-brand fw-bold fs-3 text-dark tracking-tight" 
          style={{ cursor: 'pointer', letterSpacing: '-0.5px' }} 
          onClick={() => { setView('shop'); if(setSelectedCategory) setSelectedCategory(''); }}
        >
          ESSENTIALS<span className="text-secondary font-monospace fs-6">.IN</span>
        </span>
        
        <div className="mx-auto w-50 d-none d-lg-block">
          <div className="input-group">
            <span className="input-group-text bg-light border-0 rounded-start-pill ps-3 text-secondary">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-0 bg-light rounded-end-pill py-2 text-dark px-2" 
              placeholder="Search minimalistic assets..." 
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 ms-auto">
          {isAuthenticated && (
            <button className="btn btn-link link-dark text-decoration-none small fw-medium" onClick={() => setView('orders')}>
              <i className="bi bi-clock-history me-1"></i> My Orders
            </button>
          )}

          {isAdmin && (
            <button className="btn btn-dark btn-sm rounded-pill px-3" onClick={() => setView('admin')}>
              <i className="bi bi-speedometer2 me-1"></i> Admin Panel
            </button>
          )}

          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-2 border-start ps-3">
              <span className="small fw-semibold text-dark">Hi, {user?.name.split(' ')[0]}</span>
              <button className="btn btn-outline-danger btn-sm rounded-pill px-2.5 py-0.5" onClick={() => { logout(); setView('shop'); }}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btn btn-dark btn-sm rounded-pill px-4 py-1.5" onClick={() => setView('auth')}>
              Login
            </button>
          )}

          <button className="btn position-relative p-2 bg-light rounded-circle ms-1" onClick={() => setView('cart')}>
            <i className="bi bi-bag-heart-fill text-dark fs-5"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white border border-white" style={{ fontSize: '0.65rem', padding: '0.35em 0.5em' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}