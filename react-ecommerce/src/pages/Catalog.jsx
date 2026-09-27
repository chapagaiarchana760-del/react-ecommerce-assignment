import React, { useState, useEffect } from 'react';
import { Loader2, Search, ArrowUpDown } from 'lucide-react';
import localProducts from "../data/products.json";
export default function Catalog({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New states for live search & price sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    // Emulating asynchronous local API fetch
    const fetchProducts = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localProducts) {
          resolve(localProducts);
        } else {
          reject('Failed to load products');
        }
      }, 500);
    });

    fetchProducts
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Filter products based on live search query
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  // Sort filtered products based on price selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') {
      return a.price - b.price;
    }
    if (sortOrder === 'high-to-low') {
      return b.price - a.price;
    }
    return 0; // default order
  });

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <Loader2 size={40} style={styles.spinner} />
        <p style={styles.loadingText}>Loading AnahStore catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.centerContainer}>
        <p style={styles.errorText}>Error: {error}</p>
        <button style={styles.retryButton} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Product Catalog</h1>

      {/* Controls Bar: Live Search & Price Sorting */}
      <div style={styles.controlsBar}>
        {/* Search Bar */}
        <div style={styles.searchWrapper}>
          <Search size={18} color="#6b7280" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Price Sort Dropdown */}
        <div style={styles.sortWrapper}>
          <ArrowUpDown size={18} color="#6b7280" style={styles.sortIcon} />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="default">Sort by: Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <p style={styles.noResults}>No products found matching "{searchQuery}"</p>
      ) : (
        <div style={styles.grid}>
          {sortedProducts.map((product) => (
            <div key={product.id} style={styles.card}>
              <img
                src={product.image}
                alt={product.title}
                style={styles.image}
              />
              <div style={styles.cardBody}>
                <span style={styles.category}>{product.category}</span>
                <h2 style={styles.productTitle}>{product.title}</h2>
                <p style={styles.description}>{product.description}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.price}>${product.price.toFixed(2)}</span>
                  <button
                    style={styles.addButton}
                    onClick={() => onAddToCart && onAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '1.5rem',
  },
  controlsBar: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    flex: '1',
    minWidth: '250px',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  sortWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minWidth: '200px',
  },
  sortIcon: {
    position: 'absolute',
    left: '12px',
    pointerEvents: 'none',
  },
  sortSelect: {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#000000',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  category: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
    marginBottom: '0.25rem',
  },
  productTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.875rem',
    color: '#4b5563',
    marginBottom: '1rem',
    flex: '1',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#082e88',
  },
  addButton: {
    backgroundColor: '#082e88',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    color: '#082e88',
  },
  loadingText: {
    marginTop: '1rem',
    color: '#4b5563',
  },
  errorText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  retryButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#082e88',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  noResults: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.1rem',
    marginTop: '3rem',
  },
};