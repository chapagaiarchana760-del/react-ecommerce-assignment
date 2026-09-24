import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';

export default function Navbar({ cartCount }) {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        <Store size={28} />
        <span>TechStore</span>
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Catalog</Link>
        <Link to="/cart" style={styles.cartLink}>
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span style={styles.badge}>{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1f2937',
    color: '#ffffff',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#ffffff',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontWeight: '500',
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
    fontWeight: 'bold',
    borderRadius: '50%',
    padding: '2px 6px',
  },
};