import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          style={styles.image}
        />
      </Link>
      <div style={styles.content}>
        <span style={styles.category}>{product.category}</span>
        <Link to={`/product/${product.id}`} style={styles.titleLink}>
          <h3 style={styles.title}>{product.title}</h3>
        </Link>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            style={styles.button}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  content: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  category: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: '#6b7280',
    fontWeight: '600',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#111827',
  },
  description: {
    fontSize: '0.875rem',
    color: '#4b5563',
    marginBottom: '1rem',
    flex: 1,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};