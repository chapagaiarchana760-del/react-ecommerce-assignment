import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>Have questions or feedback? We'd love to hear from you!</p>

        <div style={styles.grid}>
          {/* Contact Details */}
          <div style={styles.infoSection}>
            <div style={styles.contactItem}>
              <Mail size={22} color="#2563eb" />
              <div>
                <strong>Email</strong>
                <p style={styles.infoText}>support@Anahstore.com</p>
              </div>
            </div>

            <div style={styles.contactItem}>
              <Phone size={22} color="#2563eb" />
              <div>
                <strong>Phone</strong>
                <p style={styles.infoText}>+1 (800) 123-4567</p>
              </div>
            </div>

            <div style={styles.contactItem}>
              <MapPin size={22} color="#2563eb" />
              <div>
                <strong>Location</strong>
                <p style={styles.infoText}>Tarkeshwor-5, Kathmandu</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {submitted && (
              <div style={styles.successBanner}>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Your Name</label>
              <input
                type="text"
                required
                placeholder="Archana Chapagain"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Your Email</label>
              <input
                type="email"
                required
                placeholder="archana@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea
                rows="4"
                required
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={styles.textarea}
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '3rem 1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#111827',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    color: '#374151',
  },
  infoText: {
    margin: '0.25rem 0 0 0',
    color: '#4b5563',
    fontSize: '0.95rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  successBanner: {
    backgroundColor: '#ecfdf5',
    color: '#047857',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    outline: 'none',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
  },
  submitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};