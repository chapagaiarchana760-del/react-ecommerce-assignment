import React from 'react';
import { Store, Mail, Phone, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Store size={40} color="#2563eb" />
          <h1 style={styles.title}>About AnahStore</h1>
        </div>

        <p style={styles.description}>
          <p style={styles.description}>
  Welcome to AnahStore, your premier online destination for top-quality electronics, home goods, fashion, and lifestyle essentials.
  Built with modern web technologies including React, React Router, and LocalStorage. AnahStore delivers a fast, responsive, and seamless
  shopping experience tailored for everyday convenience. It features a user-friendly interface, secure checkout, and a dynamic product catalog
  that makes finding your favorite items effortless.
</p>
        </p>

        <hr style={styles.divider} />

        <div style={styles.contactGrid}>
          <div style={styles.contactItem}>
            <Mail size={20} color="#2563eb" />
            <span>support@anahstore.com</span>
          </div>
          <div style={styles.contactItem}>
            <Phone size={20} color="#2563eb" />
            <span>+1 (800) 123-4567</span>
          </div>
          <div style={styles.contactItem}>
            <MapPin size={20} color="#2563eb" />
            <span>Tarkeshwor-5, Kathmandu</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '3rem 1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
  },
  description: {
    fontSize: '1.05rem',
    color: '#4b5563',
    lineHeight: '1.7',
  },
  divider: {
    margin: '2rem 0',
    borderColor: '#e5e7eb',
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '1rem',
  },
  contactGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};