import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} TechStore E-Commerce Project. All rights reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1f2937',
    color: '#9ca3af',
    textAlign: 'center',
    padding: '1.5rem',
    marginTop: 'auto',
    borderTop: '1px solid #374151',
  },
  text: {
    margin: 0,
    fontSize: '0.875rem',
  },
};