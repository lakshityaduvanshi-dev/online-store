import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Orders({ setView }) {
  const [orders, setOrders] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetch(`https://online-store-1-f7cj.onrender.com/api/orders/${user.id}`)
        .then(res => res.json())
        .then(data => { setOrders(data); setLoading(false); })
        .catch(err => { console.error(err); setLoading(false); });
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <div className="container my-5 text-center"><p className="text-secondary">Access Token missing. Log in to check details.</p></div>;
  }

  return (
    <div className="container my-5" style={{ maxWidth: '850px' }}>
      <h3 className="fw-bold text-dark mb-4"><i className="bi bi-clock-history"></i> Your Historical Orders Table</h3>
      
      {loading ? (
        <div className="text-center my-5"><div className="spinner-border text-dark"></div></div>
      ) : orders.length === 0 ? (
        <div className="card p-5 border-0 bg-light rounded-4 text-center text-secondary">
          <i className="bi bi-file-earmark-break fs-1"></i><p className="mt-3 mb-0">No documented records located for this user identifier block.</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card p-4 border-muted shadow-sm rounded-4 mb-4 bg-white">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 bg-light p-3 rounded-3 gap-2">
              <div><span className="text-secondary small d-block">ORDER REFERENCE HEX ID</span><span className="font-monospace fw-bold text-dark small">{order._id}</span></div>
              <div><span className="text-secondary small d-block">DATE PLACED</span><span className="fw-semibold text-dark small">{new Date(order.createdAt).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}</span></div>
              <div><span className="text-secondary small d-block">TOTAL VALUE</span><span className="fw-bold text-success small">₹{order.total.toLocaleString('en-IN')}</span></div>
              <div><span className="badge bg-dark text-white rounded-pill px-3 py-1.5 small">{order.status}</span></div>
            </div>
            
            <div className="ps-2">
              {order.items.map((it, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center small py-2 border-bottom border-light">
                  <span className="text-dark fw-medium">{it.title} <span className="text-secondary font-monospace">x{it.qty}</span></span>
                  <span className="text-secondary fw-semibold">₹{(it.price * it.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}