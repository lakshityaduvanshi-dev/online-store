import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart({ setView }) {
  const { cartItems, clearCart, removeFromCart, updateQty } = useCart();
  const { user, isAuthenticated } = useAuth();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 10000 || subtotal === 0 ? 0.00 : 150.00;
  const tax = subtotal * 0.18; 
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Secure session error: Kindly access login token infrastructure first!');
      setView('auth');
      return;
    }

    try {
      const orderPayload = {
  userId: user.id,
  items: cartItems.map(i => ({ 
    product: i._id || i.id, 
    title: i.title, 
    qty: i.qty, 
    price: i.price 
  })),
  subtotal, 
  shipping, 
  tax, 
  total
};

      const res = await fetch('https://online-store-go9t.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        alert(`Order successfully executed! Token logged into secure DB.`);
        clearCart();
        setView('orders');
      } else {
        alert('Checkout interface tracking failure.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 py-5 text-center text-secondary">
        <i className="bi bi-cart-x fs-1"></i><h4 className="mt-3 fw-bold">Cart is currently empty</h4>
        <button className="btn btn-dark rounded-pill px-4 py-2 mt-2" onClick={() => setView('shop')}>Return Shopping Canvas</button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">Your Selected Bag</h3>
      <div className="row g-5">
        <div className="col-lg-7">
          {cartItems.map(item => (
            <div key={item._id} className="row align-items-center mb-4 border-bottom pb-4 g-3">
              <div className="col-3 col-md-2">
                <img src={item.imageUrl} alt="" className="w-100 rounded-3 border" style={{ aspectRatio: '1', objectFit: 'cover' }} />
              </div>
              <div className="col-9 col-md-5">
                <h6 className="fw-semibold text-dark mb-1">{item.title}</h6>
                <span className="small text-secondary">{item.category}</span>
              </div>
              <div className="col-6 col-md-3 d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-light border rounded-circle" onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                <span className="fw-medium px-1">{item.qty}</span>
                <button className="btn btn-sm btn-light border rounded-circle" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
              </div>
              <div className="col-6 col-md-2 text-end d-flex flex-row flex-md-column justify-content-between align-items-center">
                <span className="fw-bold mb-0">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                <button className="btn text-danger btn-sm p-0 border-0 mt-md-2" onClick={() => removeFromCart(item._id)}><i className="bi bi-trash"></i></button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-5">
          <div className="bg-light p-4 rounded-4 border-0 shadow-sm">
            <h5 className="fw-bold mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2"><span className="text-secondary">Subtotal</span><span className="fw-semibold">₹{subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
            <div className="d-flex justify-content-between mb-2"><span className="text-secondary">Shipping</span><span className="fw-semibold">{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
            <div className="d-flex justify-content-between mb-3"><span className="text-secondary">Tax (18% GST)</span><span className="fw-semibold">₹{tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-4"><span className="fw-bold">Total Bill</span><span className="fs-4 fw-bold text-dark">₹{total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
            <button className="btn btn-dark w-100 rounded-pill py-2.5 fw-medium shadow-sm" onClick={handleCheckout}>Secure Dynamic Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}