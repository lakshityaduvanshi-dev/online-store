import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductGrid from './pages/ProductGrid';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import Orders from './pages/Orders';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [view, setView] = useState('shop'); 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <AuthProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100 bg-white">
          <Navbar 
            setView={setView} 
            setSearchQuery={setSearchQuery} 
            setSelectedCategory={setSelectedCategory} 
          />
          <main className="flex-grow-1">
            {view === 'shop' && (
              <ProductGrid 
                setView={setView} 
                setSelectedProductId={setSelectedProductId} 
                searchQuery={searchQuery} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory}
              />
            )}
            {view === 'detail' && <ProductDetail productId={selectedProductId} setView={setView} />}
            {view === 'cart' && <Cart setView={setView} />}
            {view === 'auth' && <Auth setView={setView} />}
            {view === 'admin' && <AdminDashboard setView={setView} />}
            {view === 'orders' && <Orders setView={setView} />}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;