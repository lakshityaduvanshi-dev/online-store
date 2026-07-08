import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-top mt-auto py-4">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center text-center gap-3">
          <span className="fw-bold text-dark font-monospace small tracking-wider">ONLINE STORE</span>
          <p className="text-muted small mb-0 font-monospace">
            &copy; {new Date().getFullYear()} All Rights Reserved. Developed by <strong>Lakshit Yaduvanshi</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;