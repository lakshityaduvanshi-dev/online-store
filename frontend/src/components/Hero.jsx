import React from 'react';

const Hero = () => {
  return (
    <div className="bg-light py-5 mb-5 rounded-4 overflow-hidden container mt-4">
      <div className="row p-4 p-sm-5 align-items-center">
        <div className="col-lg-6 text-start">
          <span className="text-uppercase tracking-wider text-muted small fw-bold mb-2 d-block">New Essentials Are Here</span>
          <h1 className="display-4 fw-bold text-dark mb-3">Less Details.<br/>More Premium Design.</h1>
          <p className="lead text-secondary mb-4">Discover intentional objects tailored cleanly for modern living space aesthetics and productivity setups.</p>
          <button className="btn btn-dark btn-lg rounded-pill px-4 py-2 fs-6">Explore Collections</button>
        </div>
        <div className="col-lg-6 d-none d-lg-block text-center">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80" alt="Premium Store" className="img-fluid rounded-3 shadow-sm" style={{ maxHeight: '350px', objectFit: 'cover', width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default Hero;