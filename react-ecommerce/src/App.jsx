import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Catalog from './pages/Catalog.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignIn from './pages/SignIn.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Start with user as null so every app refresh forces the Sign In page
  const [user, setUser] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }, [cart]);

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleLogin = (username) => {
    setUser(username);
    triggerToast(`Welcome, ${username}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    triggerToast('Signed out successfully.');
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
        {/* Navbar and Footer render only when logged in */}
        {user && <Navbar cartCount={totalCartCount} user={user} onLogout={handleLogout} />}

        {/* Toast Notification */}
        {toastMessage && (
          <div style={styles.toast}>
            {toastMessage}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Sign In Route */}
            <Route
              path="/signin"
              element={user ? <Navigate to="/" replace /> : <SignIn onLogin={handleLogin} />}
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={user ? <Catalog onAddToCart={handleAddToCart} /> : <Navigate to="/signin" replace />}
            />
            <Route
              path="/cart"
              element={
                user ? (
                  <Cart
                    cartItems={cart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                    onCheckout={handleCheckout}
                  />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route
              path="/about"
              element={user ? <About /> : <Navigate to="/signin" replace />}
            />
            <Route
              path="/contact"
              element={user ? <Contact /> : <Navigate to="/signin" replace />}
            />
            <Route
              path="/profile"
              element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/signin" replace />}
            />

            {/* Default fallback route always redirects to /signin when not logged in */}
            <Route path="*" element={<Navigate to={user ? "/" : "/signin"} replace />} />
          </Routes>
        </div>

        {user && <Footer />}
      </div>
    </Router>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    top: '20px',
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