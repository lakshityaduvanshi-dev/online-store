import React, { useState, useEffect } from 'react';

export default function AdminDashboard({ setView }) {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('In Stock');
  const [msg, setMsg] = useState('');

  const refreshList = async () => {
    const res = await fetch('https://online-store-go9t.onrender.com/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { refreshList(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://online-store-go9t.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category, price, imageUrl, stockStatus: status })
      });
      if (res.ok) {
        setMsg('Product listed into document tree successfully!');
        setTitle(''); setDescription(''); setPrice(''); setImageUrl('');
        refreshList();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove asset permanently from MongoDB clusters?')) {
      await fetch(`https://online-store-go9t.onrender.com/api/products/${id}`, { method: 'DELETE' });
      refreshList();
    }
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-dark mb-4"><i className="bi bi-shield-lock"></i> Permanent Database Dashboard Engine</h2>
      {msg && <div className="alert alert-success rounded-3 py-2 small">{msg}</div>}
      
      <div className="row g-5">
        <div className="col-lg-5">
          <div className="card p-4 border-0 shadow-sm bg-light rounded-4">
            <h5 className="fw-bold mb-3">Post New Unique Asset</h5>
            <form onSubmit={handleCreate}>
              <div className="mb-3"><label className="small text-secondary">Title</label><input type="text" className="form-control rounded-pill" value={title} onChange={e => setTitle(e.target.value)} required /></div>
              <div className="mb-3"><label className="small text-secondary">Description</label><textarea className="form-control rounded-3" rows="3" value={description} onChange={e => setDescription(e.target.value)} required /></div>
              <div className="row mb-3">
                <div className="col"><label className="small text-secondary">Category</label>
                  <select className="form-select rounded-pill" value={category} onChange={e => setCategory(e.target.value)}>
                    <option>Electronics</option><option>Home Goods</option><option>Fashion</option><option>Fitness</option>
                  </select>
                </div>
                <div className="col"><label className="small text-secondary">Price (₹)</label><input type="number" className="form-control rounded-pill" value={price} onChange={e => setPrice(e.target.value)} required /></div>
              </div>
              <div className="mb-3"><label className="small text-secondary">Image Link URL</label><input type="url" className="form-control rounded-pill" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required /></div>
              <button type="submit" className="btn btn-dark w-100 rounded-pill py-2 mt-2 fw-medium">Inject Document Into DB</button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <h5 className="fw-bold mb-3">Active Infrastructure Logs ({products.length} Items)</h5>
          <div className="list-group rounded-4 shadow-sm overflow-hidden" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {products.map(p => (
              <div key={p._id} className="list-group-item d-flex justify-content-between align-items-center bg-white py-3 border-light">
                <div className="d-flex align-items-center gap-3">
                  <img src={p.imageUrl} alt="" className="rounded-3 border" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  <div><h6 className="mb-0 fw-semibold text-dark text-truncate" style={{ maxWidth: '280px' }}>{p.title}</h6><span className="text-secondary small">₹{p.price.toLocaleString('en-IN')} | {p.category}</span></div>
                </div>
                <button className="btn btn-link link-danger text-decoration-none" onClick={() => handleDelete(p._id)}><i className="bi bi-trash3-fill fs-5"></i></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}