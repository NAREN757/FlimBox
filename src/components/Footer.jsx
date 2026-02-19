import React from 'react';
import { Mail, Phone, Facebook, Twitter, Instagram, Youtube, PlayCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                {/* Brand & Contact */}
                <div style={styles.column}>
                    <div style={styles.brand}>
                        <h2 style={styles.logoText}>FILMBOX<span style={{ color: 'var(--filmbox-red)' }}>.</span></h2>
                    </div>
                    <div style={styles.contactItem}>
                        <Mail size={16} style={styles.icon} />
                        <span>support@filmbox.com</span>
                    </div>
                    <div style={styles.contactItem}>
                        <Phone size={16} style={styles.icon} />
                        <span>+91 2390 27649</span>
                    </div>
                    <p style={styles.copyright}>
                        Best viewed on Google Chrome 80+, Microsoft Edge 80+, Mozilla Firefox 75+, Safari 5.1.5+
                    </p>
                </div>

                {/* Links Columns */}
                <div style={styles.linksWrapper}>
                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Company</h3>
                        <ul style={styles.linkList}>
                            <li style={styles.linkItem}>About Us</li>
                            <li style={styles.linkItem}>Privacy Policy</li>
                            <li style={styles.linkItem}>Contact Us</li>
                        </ul>
                    </div>

                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Premium Movies</h3>
                        <ul style={styles.linkList}>
                            <li style={styles.linkItem}>Primal</li>
                            <li style={styles.linkItem}>Dead Evil</li>
                            <li style={styles.linkItem}>Jiesel</li>
                        </ul>
                    </div>

                    <div style={styles.column}>
                        <h3 style={styles.columnTitle}>Quick Links</h3>
                        <ul style={styles.linkList}>
                            <li style={styles.linkItem}>Terms of Use</li>
                            <li style={styles.linkItem}>Error</li>
                            <li style={styles.linkItem}>Share Feedback</li>
                        </ul>
                    </div>
                </div>

                {/* Socials */}
                <div style={styles.column}>
                    <h3 style={styles.columnTitle}>Follow Us</h3>
                    <div style={styles.socialIcons}>
                        <div style={styles.socialIcon}><Facebook size={18} /></div>
                        <div style={{ ...styles.socialIcon, backgroundColor: 'var(--filmbox-red)', color: 'white' }}><Twitter size={18} /></div>
                        <div style={styles.socialIcon}><Instagram size={18} /></div>
                        <div style={styles.socialIcon}><Youtube size={18} /></div>
                    </div>
                </div>
            </div>

            <div style={styles.exploreBtn}>
                Explore
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '60px 60px 40px 60px',
        marginTop: '80px',
        borderTop: '1px solid #1a1a1a',
        position: 'relative',
        fontSize: '0.9rem',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '40px',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minWidth: '150px',
    },
    linksWrapper: {
        display: 'flex',
        gap: '60px',
        flexWrap: 'wrap',
    },
    brand: {
        marginBottom: '10px',
    },
    logoText: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        letterSpacing: '-1px',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#888',
    },
    icon: {
        color: '#888',
    },
    copyright: {
        color: '#444',
        fontSize: '0.75rem',
        marginTop: '30px',
        maxWidth: '250px',
        lineHeight: '1.4',
    },
    columnTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '10px',
        color: '#ccc',
    },
    linkList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: 0,
        margin: 0,
        listStyle: 'none',
    },
    linkItem: {
        color: '#666',
        cursor: 'pointer',
        transition: 'color 0.2s',
    },
    socialIcons: {
        display: 'flex',
        gap: '15px',
    },
    socialIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        backgroundColor: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#ccc',
        transition: 'transform 0.2s',
    },
    exploreBtn: {
        position: 'absolute',
        bottom: '40px',
        right: '0',
        backgroundColor: '#888',
        color: '#000',
        padding: '15px 40px 15px 30px',
        fontWeight: '600',
        fontSize: '1.2rem',
        borderRadius: '30px 0 0 30px',
        cursor: 'pointer',
    }
};

export default Footer;
