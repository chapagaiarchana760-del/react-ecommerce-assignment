import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import productsData from '../data/products.json';

export default function Catalog({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Extract unique categories dynamically
  const categories = ['All', ...new Set(productsData.map((p) => p.category))];

  // 1. Filter by category
  let filteredProducts = selectedCategory === 'All'
    ? productsData
    : productsData.filter((p) => p.category === selectedCategory);

  // 2. Filter by search query
  if (searchQuery.trim() !== '') {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 3. Sort by price
  if (sortOption === 'low-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Product Catalog</h1>

      {/* Control Bar: Search, Category Filter, and Sorting */}
      <div style={styles.controlBar}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              Category: {cat}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={styles.select}
        >
          <option value="default">Sort by: Featured</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p style={styles.noResults}>No products found matching your search.</p>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
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
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#111827',
  },
  controlBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    flex: '1 1 250px',
    padding: '0.6rem 1rem',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    outline: 'none',
  },
  select: {
    padding: '0.6rem 1rem',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  noResults: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '1.1rem',
    marginTop: '3rem',
  },
};