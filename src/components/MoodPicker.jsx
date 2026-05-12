import React from 'react';

const MOODS = [
  { id: 'all',      label: '🎬 All',       color: '#E50914', desc: 'Everything' },
  { id: 'action',   label: '💥 Action',    color: '#f97316', desc: 'High-octane thrills' },
  { id: 'chill',    label: '😌 Chill',     color: '#3b82f6', desc: 'Easy & relaxing' },
  { id: 'laugh',    label: '😂 Laugh',     color: '#eab308', desc: 'Feel-good comedy' },
  { id: 'cry',      label: '😢 Emotional', color: '#8b5cf6', desc: 'Heartfelt drama' },
  { id: 'thriller', label: '😨 Thriller',  color: '#06b6d4', desc: 'Edge of your seat' },
  { id: 'romance',  label: '❤️ Romance',   color: '#ec4899', desc: 'Love stories' },
  { id: 'scifi',    label: '🚀 Sci-Fi',    color: '#10b981', desc: 'Future & beyond' },
  { id: 'horror',   label: '👻 Horror',    color: '#6b7280', desc: 'If you dare...' },
];

const MoodPicker = ({ activeMood, onSelectMood }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.label}>What's your vibe tonight?</span>
      </div>
      <div style={styles.chips} className="hide-scrollbar">
        {MOODS.map(mood => {
          const isActive = activeMood === mood.id;
          return (
            <button
              key={mood.id}
              style={{
                ...styles.chip,
                background: isActive
                  ? `linear-gradient(135deg, ${mood.color}cc, ${mood.color}66)`
                  : 'rgba(255,255,255,0.04)',
                border: isActive
                  ? `1px solid ${mood.color}88`
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: isActive ? `0 0 18px ${mood.color}55, 0 4px 12px rgba(0,0,0,0.4)` : 'none',
                transform: isActive ? 'translateY(-2px) scale(1.04)' : 'translateY(0) scale(1)',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              }}
              onClick={() => onSelectMood(mood.id)}
            >
              <span style={styles.chipLabel}>{mood.label}</span>
              {isActive && <span style={styles.chipDesc}>{mood.desc}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const MOOD_TO_GENRE = {
  all:      null,
  action:   'Action',
  chill:    'Comedy',
  laugh:    'Comedy',
  cry:      'Drama',
  thriller: 'Thriller',
  romance:  'Romance',
  scifi:    'Sci-Fi',
  horror:   'Horror',
};

export default MoodPicker;

const styles = {
  wrapper: {
    padding: '0 60px 20px',
    position: 'relative',
    zIndex: 20,
    /* Allow chip shadows to render outside without clipping */
    overflow: 'visible',
  },
  header: {
    marginBottom: '12px',
  },
  label: {
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
  },
  chips: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
    /* Padding gives room for top/side shadows to render without clipping */
    paddingTop: '8px',
    paddingBottom: '10px',
    marginTop: '-8px',
  },
  chip: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    padding: '10px 18px',
    borderRadius: '30px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
    /* Grow equally to fill all available horizontal space */
    flex: '1 1 0',
    minWidth: '80px',
    fontFamily: 'var(--font-main)',
  },
  chipLabel: {
    fontSize: '0.88rem',
    fontWeight: '700',
    lineHeight: 1,
  },
  chipDesc: {
    fontSize: '0.65rem',
    opacity: 0.8,
    fontWeight: '500',
    marginTop: '1px',
  },
};
