import React, { useState } from 'react';
import {
  Moon, Sun, User, Bell, Shield, HelpCircle, LogOut,
  Edit3, Phone, Mail, Crown, Check, ChevronRight,
  Camera, Globe, Lock, CreditCard, Star, Zap, Sparkles
} from 'lucide-react';

// ─── Avatar Options ───────────────────────────────────────────────────────────
const AVATARS = [
  { id: 1, emoji: '🦁', bg: 'linear-gradient(135deg,#f97316,#ef4444)' },
  { id: 2, emoji: '🐺', bg: 'linear-gradient(135deg,#8b5cf6,#6366f1)' },
  { id: 3, emoji: '🦊', bg: 'linear-gradient(135deg,#f59e0b,#f97316)' },
  { id: 4, emoji: '🐉', bg: 'linear-gradient(135deg,#10b981,#059669)' },
  { id: 5, emoji: '🦅', bg: 'linear-gradient(135deg,#3b82f6,#6366f1)' },
  { id: 6, emoji: '🐼', bg: 'linear-gradient(135deg,#64748b,#334155)' },
  { id: 7, emoji: '🦋', bg: 'linear-gradient(135deg,#ec4899,#8b5cf6)' },
  { id: 8, emoji: '🐬', bg: 'linear-gradient(135deg,#06b6d4,#3b82f6)' },
  { id: 9, emoji: '🦄', bg: 'linear-gradient(135deg,#f472b6,#a78bfa)' },
  { id: 10, emoji: '🐍', bg: 'linear-gradient(135deg,#84cc16,#22c55e)' },
  { id: 11, emoji: '🦈', bg: 'linear-gradient(135deg,#0ea5e9,#1d4ed8)' },
  { id: 12, emoji: '🔥', bg: 'linear-gradient(135deg,#f97316,#dc2626)' },
];

// ─── Subscription Plans ──────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    icon: <Star size={20} />,
    color: '#6b7280',
    gradient: 'linear-gradient(135deg,#374151,#1f2937)',
    features: ['720p Streaming', '1 Screen', 'Limited Library', 'Ads Included'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$9.99',
    period: '/month',
    icon: <Zap size={20} />,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#1d4ed8,#4f46e5)',
    features: ['1080p Streaming', '2 Screens', 'Full Library', 'Download 10 titles'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$15.99',
    period: '/month',
    icon: <Crown size={20} />,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#b45309,#d97706)',
    features: ['4K + HDR', '4 Screens', 'Full Library', 'Unlimited Downloads', 'Priority Support'],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const Settings = ({ theme, toggleTheme, user, userProfile = {}, onSaveProfile, onLogout }) => {
  // Profile state — initialised from lifted state (userProfile)
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatarId ?? 1);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const initName = userProfile.displayName || user?.name || user?.email?.split('@')[0] || 'User';
  const [displayName, setDisplayName] = useState(initName);
  const [nameInput, setNameInput] = useState(initName);

  // Phone state
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [phoneInput, setPhoneInput] = useState(userProfile.phone || '');

  // Subscription state
  const [activePlan, setActivePlan] = useState('standard');

  // Preferences
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  // Unsaved profile changes tracker
  const hasUnsavedProfile =
    selectedAvatar !== (userProfile.avatarId ?? 1) ||
    displayName !== (userProfile.displayName || initName) ||
    phone !== (userProfile.phone || '');

  // Toast-like inline save feedback
  const [saved, setSaved] = useState('');
  const flashSaved = (msg) => {
    setSaved(msg);
    setTimeout(() => setSaved(''), 2500);
  };

  const currentAvatar = AVATARS.find(a => a.id === selectedAvatar);

  const saveName = () => {
    if (nameInput.trim()) setDisplayName(nameInput.trim());
    setIsEditingName(false);
  };

  const savePhone = () => {
    setPhone(phoneInput.trim());
    setIsEditingPhone(false);
  };

  // ── Save Profile (propagate up to App header) ──
  const handleSaveProfile = () => {
    if (onSaveProfile) {
      onSaveProfile({ avatarId: selectedAvatar, displayName, phone });
    }
    flashSaved('Profile saved! Avatar updated in header ✓');
  };

  // ── Discard changes ──
  const handleDiscard = () => {
    setSelectedAvatar(userProfile.avatarId ?? 1);
    setDisplayName(userProfile.displayName || initName);
    setPhone(userProfile.phone || '');
    setPhoneInput(userProfile.phone || '');
  };

  return (
    <div style={s.page}>
      {/* ── Success toast ── */}
      {saved && (
        <div style={s.savedBadge}>
          <Check size={14} /> {saved}
        </div>
      )}

      {/* ── Sticky unsaved-changes bar ── */}
      {hasUnsavedProfile && (
        <div style={s.unsavedBar}>
          <span style={s.unsavedText}>⚠️ You have unsaved profile changes</span>
          <div style={s.unsavedActions}>
            <button style={s.discardBtn} onClick={handleDiscard}>Discard</button>
            <button style={s.saveProfileBtn} onClick={handleSaveProfile}>
              <Check size={14} /> Save Profile
            </button>
          </div>
        </div>
      )}

      {/* ══ HEADER ══ */}
      <div style={s.header}>
        <h1 style={s.pageTitle}>Settings</h1>
        <p style={s.pageSubtitle}>Manage your account, preferences &amp; subscription.</p>
      </div>

      {/* ══ PROFILE CARD ══ */}
      <Section title="Profile">
        <div style={s.profileCard}>
          {/* Avatar */}
          <div style={s.avatarArea}>
            <div
              style={{ ...s.bigAvatar, background: currentAvatar.bg }}
              onClick={() => setShowAvatarPicker(p => !p)}
            >
              <span style={s.avatarEmoji}>{currentAvatar.emoji}</span>
              <div style={s.cameraOverlay}>
                <Camera size={16} color="white" />
              </div>
            </div>
            <span style={s.changeAvatarHint}>Tap to change</span>
          </div>

          {/* Avatar Picker */}
          {showAvatarPicker && (
            <div style={s.avatarGrid}>
              {AVATARS.map(av => (
                <div
                  key={av.id}
                  style={{
                    ...s.avatarThumb,
                    background: av.bg,
                    outline: av.id === selectedAvatar ? '2px solid #E50914' : '2px solid transparent',
                    transform: av.id === selectedAvatar ? 'scale(1.15)' : 'scale(1)',
                  }}
                  onClick={() => { setSelectedAvatar(av.id); setShowAvatarPicker(false); flashSaved('Avatar updated!'); }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{av.emoji}</span>
                </div>
              ))}
            </div>
          )}

          {/* Info Fields */}
          <div style={s.infoFields}>
            {/* Display Name */}
            <FieldRow icon={<User size={18} />} label="Display Name">
              {isEditingName ? (
                <div style={s.inlineEdit}>
                  <input
                    autoFocus
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setIsEditingName(false); }}
                    style={s.inlineInput}
                    maxLength={30}
                  />
                  <button style={s.saveBtn} onClick={saveName}>Save</button>
                  <button style={s.cancelBtn} onClick={() => setIsEditingName(false)}>✕</button>
                </div>
              ) : (
                <div style={s.fieldValue}>
                  <span>{displayName}</span>
                  <button style={s.editIconBtn} onClick={() => { setNameInput(displayName); setIsEditingName(true); }}>
                    <Edit3 size={14} />
                  </button>
                </div>
              )}
            </FieldRow>

            {/* Email (read-only) */}
            <FieldRow icon={<Mail size={18} />} label="Email">
              <div style={s.fieldValue}>
                <span style={s.dimText}>{user?.email || 'user@example.com'}</span>
              </div>
            </FieldRow>

            {/* Phone */}
            <FieldRow icon={<Phone size={18} />} label="Phone Number">
              {isEditingPhone ? (
                <div style={s.inlineEdit}>
                  <input
                    autoFocus
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={phoneInput}
                    onChange={e => setPhoneInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') savePhone(); if (e.key === 'Escape') setIsEditingPhone(false); }}
                    style={s.inlineInput}
                  />
                  <button style={s.saveBtn} onClick={savePhone}>Save</button>
                  <button style={s.cancelBtn} onClick={() => setIsEditingPhone(false)}>✕</button>
                </div>
              ) : (
                <div style={s.fieldValue}>
                  <span style={phone ? undefined : s.dimText}>{phone || 'Not added'}</span>
                  <button style={s.editIconBtn} onClick={() => { setPhoneInput(phone); setIsEditingPhone(true); }}>
                    <Edit3 size={14} />
                  </button>
                </div>
              )}
            </FieldRow>
          </div>
        </div>
      </Section>

      {/* ══ SUBSCRIPTION PLANS ══ */}
      <Section title="Subscription Plan">
        <div style={s.plansGrid}>
          {PLANS.map(plan => {
            const isActive = plan.id === activePlan;
            return (
              <div
                key={plan.id}
                style={{
                  ...s.planCard,
                  background: isActive ? plan.gradient : 'rgba(255,255,255,0.03)',
                  border: isActive ? `1px solid ${plan.color}55` : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isActive ? `0 8px 32px ${plan.color}30` : 'none',
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                }}
                onClick={() => { setActivePlan(plan.id); flashSaved(`Switched to ${plan.name} plan!`); }}
              >
                {plan.popular && <div style={s.popularBadge}>Most Popular</div>}
                <div style={{ ...s.planIcon, color: plan.color }}>{plan.icon}</div>
                <div style={s.planName}>{plan.name}</div>
                <div style={s.planPrice}>
                  <span style={s.planPriceNum}>{plan.price}</span>
                  <span style={s.planPricePer}>{plan.period}</span>
                </div>
                <ul style={s.planFeatures}>
                  {plan.features.map(f => (
                    <li key={f} style={s.planFeature}>
                      <Check size={13} style={{ color: isActive ? 'rgba(255,255,255,0.9)' : plan.color, flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {isActive && (
                  <div style={s.activePlanBadge}>
                    <Check size={13} /> Current Plan
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ══ PREFERENCES ══ */}
      <Section title="Preferences">
        <div style={s.card}>
          <ToggleRow
            icon={theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            desc="Switch between dark and light theme"
            value={theme === 'dark'}
            onChange={toggleTheme}
          />
          <ToggleRow
            icon={<Bell size={18} />}
            label="Push Notifications"
            desc="New releases, recommendations & updates"
            value={notifEnabled}
            onChange={() => setNotifEnabled(p => !p)}
          />
          <ToggleRow
            icon={<Sparkles size={18} />}
            label="Autoplay Next Episode"
            desc="Automatically play the next episode"
            value={autoplay}
            onChange={() => setAutoplay(p => !p)}
          />
          <ToggleRow
            icon={<Globe size={18} />}
            label="Data Saver"
            desc="Reduce streaming quality to save data"
            value={dataSaver}
            onChange={() => setDataSaver(p => !p)}
          />
        </div>
      </Section>

      {/* ══ SECURITY ══ */}
      <Section title="Security & Support">
        <div style={s.card}>
          <NavRow icon={<Lock size={18} />} label="Change Password" />
          <NavRow icon={<Shield size={18} />} label="Privacy & Security" />
          <NavRow icon={<CreditCard size={18} />} label="Billing & Payments" />
          <NavRow icon={<HelpCircle size={18} />} label="Help & Support" last />
        </div>
      </Section>

      {/* ══ SIGN OUT ══ */}
      <button style={s.logoutBtn} onClick={onLogout}>
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  );
};

// ─── Sub-Components ────────────────────────────────────────────────────────────

const Section = ({ title, children }) => (
  <div style={s.section}>
    <h2 style={s.sectionLabel}>{title}</h2>
    {children}
  </div>
);

const FieldRow = ({ icon, label, children }) => (
  <div style={s.fieldRow}>
    <div style={s.fieldLeft}>
      <span style={s.fieldIcon}>{icon}</span>
      <span style={s.fieldLabel}>{label}</span>
    </div>
    <div style={s.fieldRight}>{children}</div>
  </div>
);

const ToggleRow = ({ icon, label, desc, value, onChange }) => (
  <div style={s.toggleRow} onClick={onChange}>
    <div style={s.toggleLeft}>
      <span style={s.toggleIcon}>{icon}</span>
      <div>
        <div style={s.toggleLabel}>{label}</div>
        <div style={s.toggleDesc}>{desc}</div>
      </div>
    </div>
    <div style={{ ...s.toggleTrack, background: value ? 'var(--filmbox-red)' : 'rgba(255,255,255,0.1)' }}>
      <div style={{ ...s.toggleKnob, transform: value ? 'translateX(22px)' : 'translateX(0)' }} />
    </div>
  </div>
);

const NavRow = ({ icon, label, last }) => (
  <div style={{ ...s.navRow, borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
    <div style={s.navLeft}>
      <span style={s.fieldIcon}>{icon}</span>
      <span style={s.toggleLabel}>{label}</span>
    </div>
    <ChevronRight size={18} style={{ opacity: 0.4 }} />
  </div>
);

// ─── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page: {
    padding: '40px 48px',
    maxWidth: '860px',
    margin: '0 auto',
    color: 'var(--filmbox-text)',
    paddingBottom: '120px',
    position: 'relative',
  },
  savedBadge: {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg,#10b981,#059669)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '40px',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    zIndex: 9999,
    boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
    animation: 'fadeIn 0.2s ease',
  },
  header: { marginBottom: '40px' },
  pageTitle: { fontSize: '2.2rem', fontWeight: '800', marginBottom: '6px' },
  pageSubtitle: { color: 'var(--filmbox-text-dim)', fontSize: '0.95rem' },

  section: { marginBottom: '36px' },
  sectionLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--filmbox-text-dim)',
    marginBottom: '14px',
  },

  // Profile Card
  profileCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '20px',
    padding: '28px 28px 10px',
    backdropFilter: 'blur(12px)',
  },
  avatarArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  bigAvatar: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    transition: 'transform 0.2s',
  },
  avatarEmoji: { fontSize: '2.8rem', lineHeight: 1 },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: '#E50914',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #0f0f0f',
  },
  changeAvatarHint: { fontSize: '0.75rem', color: 'var(--filmbox-text-dim)', marginTop: '8px' },

  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '10px',
    marginBottom: '24px',
    padding: '16px',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  avatarThumb: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, outline 0.2s',
  },

  // Info Fields
  infoFields: { display: 'flex', flexDirection: 'column', gap: '2px' },
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  fieldLeft: { display: 'flex', alignItems: 'center', gap: '12px', minWidth: '160px' },
  fieldIcon: { color: '#E50914', opacity: 0.85, display: 'flex' },
  fieldLabel: { fontSize: '0.9rem', fontWeight: '500', color: 'var(--filmbox-text-dim)' },
  fieldRight: { flex: 1, display: 'flex', justifyContent: 'flex-end' },
  fieldValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  dimText: { color: 'var(--filmbox-text-dim)' },

  inlineEdit: { display: 'flex', alignItems: 'center', gap: '8px' },
  inlineInput: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    padding: '6px 12px',
    color: 'white',
    fontSize: '0.9rem',
    outline: 'none',
    width: '180px',
  },
  saveBtn: {
    background: '#E50914',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 14px',
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelBtn: {
    background: 'rgba(255,255,255,0.08)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: '0.82rem',
    cursor: 'pointer',
  },
  editIconBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: 'none',
    color: 'rgba(255,255,255,0.6)',
    borderRadius: '6px',
    padding: '5px 7px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.2s',
  },

  // Plans
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  planCard: {
    borderRadius: '18px',
    padding: '22px 18px',
    cursor: 'pointer',
    transition: 'transform 0.25s, box-shadow 0.25s',
    position: 'relative',
    overflow: 'hidden',
  },
  popularBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(4px)',
    fontSize: '0.65rem',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '20px',
    letterSpacing: '0.5px',
    color: 'white',
  },
  planIcon: { display: 'flex', marginBottom: '10px' },
  planName: { fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' },
  planPrice: { display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '14px' },
  planPriceNum: { fontSize: '1.6rem', fontWeight: '800' },
  planPricePer: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' },
  planFeatures: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' },
  planFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.75)',
  },
  activePlanBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    marginTop: '14px',
    background: 'rgba(255,255,255,0.15)',
    padding: '5px 10px',
    borderRadius: '20px',
    width: 'fit-content',
  },

  // Generic card
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '20px',
    overflow: 'hidden',
  },

  // Toggle rows
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 22px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  toggleLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  toggleIcon: { color: '#E50914', opacity: 0.85, display: 'flex' },
  toggleLabel: { fontSize: '0.95rem', fontWeight: '500' },
  toggleDesc: { fontSize: '0.78rem', color: 'var(--filmbox-text-dim)', marginTop: '2px' },
  toggleTrack: {
    width: '46px',
    height: '26px',
    borderRadius: '13px',
    position: 'relative',
    transition: 'background 0.3s',
    flexShrink: 0,
  },
  toggleKnob: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'white',
    transition: 'transform 0.3s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  },

  // Nav rows
  navRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 22px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  navLeft: { display: 'flex', alignItems: 'center', gap: '14px' },

  logoutBtn: {
    width: '100%',
    padding: '15px',
    background: 'rgba(229,9,20,0.08)',
    color: '#E50914',
    border: '1px solid rgba(229,9,20,0.2)',
    borderRadius: '14px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '16px',
    transition: 'background 0.2s, box-shadow 0.2s',
  },

  // Unsaved changes bar
  unsavedBar: {
    position: 'sticky',
    top: '16px',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.08))',
    border: '1px solid rgba(245,158,11,0.35)',
    borderRadius: '14px',
    padding: '12px 20px',
    marginBottom: '20px',
    backdropFilter: 'blur(12px)',
    gap: '12px',
  },
  unsavedText: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#fbbf24',
    flex: 1,
  },
  unsavedActions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  discardBtn: {
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '7px 16px',
    fontSize: '0.83rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveProfileBtn: {
    background: 'linear-gradient(135deg,#E50914,#b91c1c)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 18px',
    fontSize: '0.88rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 14px rgba(229,9,20,0.4)',
  },
};

export default Settings;
