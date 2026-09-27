import React from 'react';
import { User, Mail, ShieldCheck, ShoppingBag, LogOut } from 'lucide-react';

export default function Profile({ user, onLogout }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header Avatar Section */}
        <div style={styles.avatarSection}>
          <div style={styles.avatarCircle}>
            <User size={48} color="#2563eb" />
          </div>
          <h1 style={styles.name}>{user}</h1>
          <span style={styles.badge}>
            <ShieldCheck size={16} /> Verified Account
          </span>
        </div>

        <hr style={styles.divider} />

        {/* User Details Grid */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <Mail size={20} color="#2563eb" />
            <div>
              <p style={styles.infoLabel}>Email Address</p>
              <p style={styles.infoValue}>{user?.toLowerCase()}@gmail.com</p>
            </div>
          </div>

          <div style={styles.infoCard}>
            <ShoppingBag size={20} color="#2563eb" />
            <div>
              <p style={styles.infoLabel}>Account Type</p>
              <p style={styles.infoValue}>AnahStore Member</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button onClick={onLogout} style={styles.logoutBtn}>
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  avatarCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#111827',
    margin: 0,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: '#ecfdf5',
    color: '#047857',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  divider: {
    margin: '2rem 0',
    borderColor: '#f3f4f6',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #f3f4f6',
  },
  infoLabel: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#6b7280',
  },
  infoValue: {
    margin: '0.2rem 0 0 0',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#111827',
  },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};