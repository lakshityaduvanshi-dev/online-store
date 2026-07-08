import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function ProductGrid({ setView, setSelectedProductId, searchQuery, selectedCategory, setSelectedCategory }) {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ["Electronics", "Home Goods", "Fashion", "Fitness"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `https://online-store-go9t.onrender.com/api/products?search=${searchQuery || ''}&category=${selectedCategory || ''}&sort=${sortOption}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery, selectedCategory, sortOption]);

  return (
    <div className="container my-5">
      {/* Category Capsules & Sorting Toolbar Panel */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 mb-5 border-bottom pb-4">
        <div className="d-flex flex-wrap gap-2">
          <button 
            className={`btn btn-sm rounded-pill px-4 py-2 ${selectedCategory === '' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setSelectedCategory('')}
          >
            All Collections
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-4 py-2 ${selectedCategory === cat ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="d-flex align-items-center gap-2" style={{ minWidth: '220px' }}>
          <span className="small text-secondary text-nowrap"><i className="bi bi-sliders"></i> Sort:</span>
          <select className="form-select form-select-sm rounded-pill border-dark" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Default/Latest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid Canvas Display */}
      {loading ? (
        <div className="text-center my-5 py-5"><div className="spinner-border text-dark" role="status"></div></div>
      ) : products.length === 0 ? (
        <div className="text-center my-5 py-5 text-secondary"><i className="bi bi-box-open fs-1"></i><p className="mt-3">No dynamic match sets located.</p></div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map(prod => (
            <ProductCard 
              key={prod._id} 
              product={prod} 
              setView={setView} 
              setSelectedProductId={setSelectedProductId} 
            />
          ))}
        </div>
      )}
    </div>
  );
}