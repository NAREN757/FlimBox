import React from 'react';
import { Moon, Sun, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

const Settings = ({ theme, toggleTheme, user, onLogout }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Settings</h1>
                <p style={styles.subtitle}>Manage your account and preferences.</p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Account</h2>
                <div style={styles.card}>
                    <div style={styles.profileRow}>
                        <div style={styles.avatar}>
                            <User size={40} />
                        </div>
                        <div style={styles.profileInfo}>
                            <h3 style={styles.profileName}>{user?.name || 'User'}</h3>
                            <p style={styles.profileEmail}>{user?.email || 'user@example.com'}</p>
                        </div>
                        <button style={styles.editBtn}>Edit</button>
                    </div>
                </div>
            </div>



            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Preferences</h2>
                <div style={styles.card}>
                    <SettingItem icon={<Bell size={20} />} label="Notifications" />
                    <SettingItem icon={<Shield size={20} />} label="Privacy & Security" />
                    <SettingItem icon={<HelpCircle size={20} />} label="Help & Support" />
                </div>
            </div>

            <button style={styles.logoutBtn} onClick={onLogout}>
                <LogOut size={20} />
                Sign Out
            </button>
        </div>
    );
};

const SettingItem = ({ icon, label }) => (
    <div style={styles.settingRow}>
        <div style={styles.settingInfo}>
            <div style={styles.iconWrapper}>{icon}</div>
            <span style={styles.settingLabel}>{label}</span>
        </div>
        <ArrowRightIcon />
    </div>
);

const ArrowRightIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const styles = {
    container: {
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        color: 'var(--filmbox-text)',
        paddingBottom: '100px',
    },
    header: {
        marginBottom: '40px',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '10px',
    },
    subtitle: {
        color: 'var(--filmbox-text-dim)',
    },
    section: {
        marginBottom: '40px',
    },
    sectionTitle: {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '20px',
        color: 'var(--filmbox-text-dim)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    card: {
        backgroundColor: 'var(--filmbox-card-bg)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
    },
    profileRow: {
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
        gap: '20px',
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '5px',
    },
    profileEmail: {
        color: 'var(--filmbox-text-dim)',
    },
    editBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '8px 16px',
        cursor: 'pointer',
    },
    settingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    settingInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    iconWrapper: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--filmbox-red)',
    },
    settingLabel: {
        fontSize: '1.1rem',
        fontWeight: '500',
    },
    toggleWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
    },
    toggleLabel: {
        fontSize: '0.9rem',
        color: 'var(--filmbox-text-dim)',
    },
    toggle: {
        width: '50px',
        height: '28px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '14px',
        position: 'relative',
        transition: 'background 0.3s',
    },
    toggleActive: {
        backgroundColor: 'var(--filmbox-red)',
    },
    toggleKnob: {
        width: '24px',
        height: '24px',
        backgroundColor: 'white',
        borderRadius: '50%',
        position: 'absolute',
        top: '2px',
        left: '2px',
        transition: 'transform 0.3s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    toggleKnobActive: {
        transform: 'translateX(22px)',
    },
    logoutBtn: {
        width: '100%',
        padding: '16px',
        backgroundColor: 'rgba(229, 9, 20, 0.1)',
        color: 'var(--filmbox-red)',
        border: '1px solid rgba(229, 9, 20, 0.2)',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
        transition: 'background 0.2s',
    }
};

export default Settings;
