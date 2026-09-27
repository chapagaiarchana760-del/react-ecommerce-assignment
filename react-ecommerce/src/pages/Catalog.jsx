import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { Loader2 } from 'lucide-react';

import localProducts from "../data/products.json";


export default function Catalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate an asynchronous API network fetch using a Promise
    const fetchProductsApi = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localProducts && localProducts.length > 0) {
          resolve(localProducts);
        } else {
          reject(new Error('Failed to fetch products from local API data source.'));
        }
      }, 500); // 500ms delay simulates real network latency
    });

    fetchProductsApi
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.center}>
        <Loader2 size={36} style={styles.spinner} color="#2563eb" />
        <p style={{ marginTop: '1rem', color: '#4b5563', fontWeight: '500' }}>
          Fetching catalog items...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <p style={{ color: '#ef4444', fontWeight: '600' }}>Error: {error}</p>
        <button onClick={() => window.location.reload()} style={styles.retryBtn}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Latest Products</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  heading: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
  retryBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};