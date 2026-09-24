import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function Catalog({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from product list
  const categories = ['All', ...new Set(productsData.map((p) => p.category))];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Product Catalog</h2>
        <div style={styles.filterContainer}>
          <label htmlFor="category" style={styles.label}>Filter by Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '500',
    color: '#374151',
  },
  select: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
};