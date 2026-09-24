import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function Cart({ cartItems, onUpdateQuantity, onRemoveFromCart, onClearCart }) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h2>Your Cart is Empty</h2>
        <p style={styles.emptyText}>Looks like you haven't added any products yet.</p>
        <Link to="/" style={styles.shopBtn}>
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Shopping Cart</h2>
      <div style={styles.cartContent}>
        <div style={styles.itemsList}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.itemRow}>
              <img src={item.image} alt={item.title} style={styles.itemImg} />
              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>

              <div style={styles.quantityControls}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={14} />
                </button>
                <span style={styles.qtyText}>{item.quantity}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

              <span style={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button
                style={styles.removeBtn}
                onClick={() => onRemoveFromCart(item.id)}
                title="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div style={styles.summaryCard}>
          <h3>Order Summary</h3>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr style={styles.divider} />
          <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: '1.1rem' }}>
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            style={styles.checkoutBtn}
            onClick={() => {
              alert('Thank you for your order!');
              onClearCart();
            }}
          >
            Proceed to Checkout
          </button>
        </div>
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
  emptyContainer: {
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  emptyText: {
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
  shopBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
  },
  cartContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginTop: '1.5rem',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  itemImg: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  itemDetails: {
    flexGrow: 1,
  },
  itemTitle: {
    fontSize: '0.95rem',
    margin: '0 0 0.25rem 0',
    color: '#111827',
  },
  itemPrice: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: 0,
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  qtyBtn: {
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  qtyText: {
    fontWeight: '600',
    minWidth: '20px',
    textAlign: 'center',
  },
  itemTotal: {
    fontWeight: 'bold',
    minWidth: '70px',
    textAlign: 'right',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  summaryCard: {
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    height: 'fit-content',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.75rem 0',
    color: '#374151',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e5e7eb',
    margin: '1rem 0',
  },
  checkoutBtn: {
    width: '100%',
    backgroundColor: '#16a34a',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};