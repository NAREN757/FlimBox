import React from 'react';
import { Home, Grid, Heart, Bookmark, Settings, LogOut, PlayCircle } from 'lucide-react';

const Sidebar = ({ activeView, onNavigate, onLogout }) => {
    return (
        <div style={styles.sidebar}>
            {/* Logo */}
            <div style={styles.logoWrapper}>
                <div style={styles.logoIcon}>
                    <PlayCircle size={20} fill="white" stroke="none" />
                </div>
            </div>

            {/* Menu */}
            <div style={styles.menu}>
                <NavItem
                    icon={<Home size={24} />}
                    tooltip="Home"
                    active={activeView === 'home'}
                    onClick={() => onNavigate('home')}
                />
                <NavItem
                    icon={<Grid size={24} />}
                    tooltip="Discover"
                    active={activeView === 'grid'}
                    onClick={() => onNavigate('grid')}
                />
                <NavItem
                    icon={<Heart size={24} />}
                    tooltip="Favorites"
                    active={activeView === 'favorites'}
                    onClick={() => onNavigate('favorites')}
                />
                <NavItem
                    icon={<Bookmark size={24} />}
                    tooltip="Watchlist"
                    active={activeView === 'watchlist'}
                    onClick={() => onNavigate('watchlist')}
                />
            </div>

            {/* Bottom Actions */}
            <div style={styles.bottomMenu}>
                <NavItem
                    icon={<Settings size={24} />}
                    tooltip="Settings"
                    active={activeView === 'settings'}
                    onClick={() => onNavigate('settings')}
                />
                <NavItem icon={<LogOut size={24} />} tooltip="Sign Out" onClick={onLogout} />
            </div>
        </div>
    );
};

const NavItem = ({ icon, active, onClick, tooltip }) => (
    <div
        style={{ ...styles.navItem, ...(active ? styles.activeNavItem : {}) }}
        onClick={onClick}
        title={tooltip}
    >
        {icon}
        {active && <div style={styles.activeIndicator} />}
    </div>
);


const styles = {
    sidebar: {
        width: '80px',
        height: '100vh',
        backgroundColor: 'var(--filmbox-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 0',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        borderRight: '1px solid var(--filmbox-border)',
    },
    logoWrapper: {
        marginBottom: '60px',
    },
    logoIcon: {
        width: '40px',
        height: '40px',
        backgroundColor: 'var(--filmbox-red)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 15px var(--filmbox-red-glow)',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        flex: 1,
    },
    bottomMenu: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    navItem: {
        color: '#666',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.3s',
    },
    activeNavItem: {
        color: 'var(--filmbox-red)',
    },
    activeIndicator: {
        position: 'absolute',
        right: '-30px', // Hit the edge of sidebar
        width: '3px',
        height: '20px',
        backgroundColor: 'var(--filmbox-red)',
        borderRadius: '2px 0 0 2px',
        boxShadow: '0 0 10px var(--filmbox-red)',
    }
};

export default Sidebar;
