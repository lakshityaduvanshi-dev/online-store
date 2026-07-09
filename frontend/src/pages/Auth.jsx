import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Auth({ setView }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(`https://online-store-1-f7cj.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      
      login(data.user, data.token);
      setView('shop'); // Success hote hi landing shop screen par redirect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container my-5 py-5" style={{ maxWidth: '450px' }}>
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
        <h3 className="fw-bold text-center mb-4 text-dark">{isLogin ? 'Log In' : 'Create Account'}</h3>
        {error && <div className="alert alert-danger py-2 rounded-3 small">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3 text-start">
              <label className="form-label small text-secondary">Full Name</label>
              <input type="text" className="form-control rounded-pill" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div className="mb-3 text-start">
            <label className="form-label small text-secondary">Email Address</label>
            <input type="email" className="form-control rounded-pill" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4 text-start">
            <label className="form-label small text-secondary">Password</label>
            <input type="password" className="form-control rounded-pill" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-dark w-100 rounded-pill py-2 fw-medium mb-3">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="text-center small">
          <span className="text-secondary">{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
          <button className="btn btn-link p-0 text-dark fw-bold text-decoration-none small" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register Here' : 'Login Here'}
          </button>
        </div>
      </div>
    </div>
  );
}