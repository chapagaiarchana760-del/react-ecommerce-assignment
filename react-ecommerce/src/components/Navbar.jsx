import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store, User, LogOut } from 'lucide-react';

export default function Navbar({ cartCount, user, onLogout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          <Store size={28} />
          <span>AnahStore</span>
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Catalog</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          
          <Link to="/cart" style={styles.cartLink}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>

          {user ? (
            <div style={styles.userSection}>
              <Link to="/profile" style={styles.profileBtn}>
                <User size={16} /> Hi, {user}
              </Link>
              <button onClick={onLogout} style={styles.logoutBtn}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/signin" style={styles.signInBtn}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ffffff',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  link: {
    color: '#d1d5db',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
  },
  cartLink: {
    position: 'relative',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-10px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: '700',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  profileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    color: '#ffffff',
    textDecoration: 'none',
    backgroundColor: '#374151',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: '1px solid #4b5563',
    color: '#d1d5db',
    padding: '0.4rem 0.6rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  signInBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.4rem 0.9rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
};