import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, setView, setSelectedProductId }) => {
  const { addToCart } = useCart();

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative transition-all card-hover-effect">
        <div 
          style={{ cursor: 'pointer', height: '260px', overflow: 'hidden' }}
          onClick={() => { setSelectedProductId(product._id); setView('detail'); }}
        >
          <img 
            src={product.imageUrl} 
            className="card-img-top w-100 h-100 object-fit-cover transition-transform duration-300 img-hover" 
            alt={product.title} 
          />
        </div>
        <div className="card-body p-4 text-start d-flex flex-column justify-content-between">
          <div>
            <span className="text-muted text-uppercase font-monospace small d-block mb-1">{product.category}</span>
            <h6 
              className="fw-bold text-dark text-truncate mb-2" 
              style={{ cursor: 'pointer' }}
              onClick={() => { setSelectedProductId(product._id); setView('detail'); }}
            >
              {product.title}
            </h6>
            <div className="d-flex align-items-center mb-3">
              <span className="text-warning me-1">★</span>
              <span className="small text-dark fw-medium me-2">{product.rating}</span>
              <span className="small text-muted">({product.reviewCount})</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <span className="fs-5 fw-bold text-dark">₹{product.price.toFixed(2)}</span>
            <button 
              className="btn btn-outline-dark btn-sm rounded-pill px-3"
              disabled={product.stockStatus === 'Out of Stock'}
              onClick={() => addToCart(product)}
            >
              {product.stockStatus === 'Out of Stock' ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;