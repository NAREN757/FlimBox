import React from 'react';
import { X } from 'lucide-react';

const SHORTCUTS = [
  { keys: ['H'], action: 'Go to Home' },
  { keys: ['S'], action: 'Focus Search' },
  { keys: ['F'], action: 'Favorites' },
  { keys: ['W'], action: 'Watchlist' },
  { keys: ['D'], action: 'Discover / Browse' },
  { keys: ['ESC'], action: 'Close modal / Go home' },
  { keys: ['?'], action: 'Toggle this shortcuts panel' },
  { keys: ['←', '→'], action: 'Browse hero carousel' },
];

const ShortcutsModal = ({ onClose }) => (
  <div style={styles.backdrop} onClick={onClose}>
    <div style={styles.modal} onClick={e => e.stopPropagation()}>
      <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>

      <div style={styles.iconRow}>
        <span style={styles.kbIcon}>⌨️</span>
      </div>
      <h2 style={styles.title}>Keyboard Shortcuts</h2>
      <p style={styles.subtitle}>Navigate FlimBox at the speed of thought.</p>

      <div style={styles.list}>
        {SHORTCUTS.map(({ keys, action }) => (
          <div key={action} style={styles.row}>
            <div style={styles.keysGroup}>
              {keys.map(k => (
                <kbd key={k} style={styles.key}>{k}</kbd>
              ))}
            </div>
            <span style={styles.action}>{action}</span>
          </div>
        ))}
      </div>

      <p style={styles.tip}>
        💡 <strong>Tip:</strong> Press <kbd style={styles.keyInline}>?</kbd> anytime to open this panel.
      </p>
    </div>
  </div>
);

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9000,
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    background: 'linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '36px 40px',
    width: '460px',
    maxWidth: '95vw',
    position: 'relative',
    boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(255,255,255,0.07)',
    border: 'none',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: { textAlign: 'center', marginBottom: '12px' },
  kbIcon: { fontSize: '2.2rem' },
  title: {
    textAlign: 'center',
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '6px',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '28px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '24px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  keysGroup: { display: 'flex', gap: '6px' },
  key: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    height: '28px',
    padding: '0 8px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderBottom: '2px solid rgba(255,255,255,0.25)',
    borderRadius: '7px',
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'white',
    fontFamily: 'monospace',
    letterSpacing: '0',
  },
  action: {
    fontSize: '0.88rem',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  tip: {
    fontSize: '0.78rem',
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '16px',
  },
  keyInline: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '4px',
    padding: '1px 6px',
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.6)',
  },
};

export default ShortcutsModal;
