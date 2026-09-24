import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Footer from './components/Footer.jsx';
import Catalog from './pages/Catalog.jsx';
import Cart from './pages/Cart.jsx';

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }, [cart]);

  // Trigger temporary notification banner
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    triggerToast(`Added "${product.title}" to cart!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    setCart([]);
    triggerToast('🎉 Order placed successfully! Thank you for shopping.');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6', position: 'relative' }}>
        <Navbar cartCount={totalCartCount} />

        {/* Toast Notification Pop-up */}
        {toastMessage && (
          <div style={styles.toast}>
            {toastMessage}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={<Catalog onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                  onClearCart={handleClearCart}
                  onCheckout={handleCheckout}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    top: '70px',
    right: '20px',
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
  },
};