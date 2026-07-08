import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductDetail = ({ productId, setView }) => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://online-store-1-f7cj.onrender.com/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [productId]);

  if (!product) return <div className="text-center py-5"><div className="spinner-border text-dark"></div></div>;

  return (
    <div className="container my-5 py-3">
      <button className="btn btn-link text-dark p-0 mb-4 text-decoration-none" onClick={() => setView('shop')}>
        ← Back to browse
      </button>
      <div className="row g-5">
        <div className="col-md-6">
          <div className="rounded-4 overflow-hidden bg-light" style={{ maxHeight: '500px' }}>
            <img src={product.imageUrl} className="img-fluid w-100 h-100 object-fit-cover" alt={product.title} />
          </div>
        </div>
        <div className="col-md-6 text-start">
          <span className="badge bg-secondary mb-2 px-3 py-2 rounded-pill font-monospace">{product.category}</span>
          <h1 className="fw-bold mb-2 text-dark">{product.title}</h1>
          <div className="d-flex align-items-center mb-3">
            <span className="text-warning fs-5">★★★★★</span>
            <span className="ms-2 fw-semibold">{product.rating}</span>
            <span className="text-muted ms-1">({product.reviewCount} customer reviews)</span>
          </div>
          <h2 className="fw-bold text-dark mb-4">₹{product.price.toFixed(2)}</h2>
          <hr className="my-4 text-muted" />
          <p className="text-secondary mb-4lh-lg">{product.description}</p>
          
          <div className="mb-4">
            <span className="fw-bold text-dark d-block mb-2">Availability:</span>
            <span className={`fw-semibold ${product.stockStatus === 'In Stock' ? 'text-success' : 'text-danger'}`}>
              ● {product.stockStatus}
            </span>
          </div>

          {product.stockStatus === 'In Stock' && (
            <div className="d-flex align-items-center gap-3">
              <div className="input-group" style={{ width: '130px' }}>
                <button className="btn btn-outline-secondary" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                <input type="text" className="form-control text-center bg-white" value={qty} readOnly />
                <button className="btn btn-outline-secondary" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="btn btn-dark rounded-pill px-5 py-2.5" onClick={() => { addToCart(product, qty); setView('cart'); }}>
                Add to Shopping Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;