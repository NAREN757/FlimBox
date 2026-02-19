import React from 'react';
import { User } from 'lucide-react';

const Navigation = ({ activeTab, onTabChange }) => {
    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={styles.leftSection}>
                    {/* Logo Area */}
                    <div style={styles.logo} onClick={() => onTabChange('home')}>
                        <span style={{ color: '#ff4d4d', fontWeight: '900' }}>1</span>
                        <span style={{ color: '#fff', fontWeight: '900' }}>FLIX</span>
                    </div>

                    {/* Links */}
                    <ul style={styles.menu}>
                        {['HOME', 'GENRE', 'COUNTRY', 'MOVIES', 'TV SHOWS', 'TOP IMDB', 'ANDROID APP'].map((item) => (
                            <li key={item} style={styles.menuItem}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={styles.rightSection}>
                    <button style={styles.loginBtn}>
                        <User size={16} /> Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        width: '100%',
        padding: '15px 0',
        zIndex: 100,
        position: 'relative',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
    },
    logo: {
        fontSize: '2rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    menu: {
        display: 'flex',
        gap: '20px',
        listStyle: 'none',
    },
    menuItem: {
        color: '#ccc',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'color 0.2s',
        textTransform: 'uppercase',
        ':hover': {
            color: '#fff',
        }
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
    },
    loginBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#fff',
        color: '#333',
        border: 'none',
        padding: '8px 20px',
        borderRadius: '4px',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
    }
};

export default Navigation;
