import React, { useState } from 'react';
import { Search, ArrowRight, Facebook, Twitch, MessageCircle } from 'lucide-react';
// Note: We might need to import specific icons or use a library for X/Twitter/Reddit if lucide doesn't have them
// For now using placeholders or closest matches.

const HomeHero = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) onSearch(query);
    }

    return (
        <div style={styles.heroContainer}>
            {/* Background Image with Overlay */}
            <div style={styles.background}>
                <div style={styles.overlay}></div>
                <img
                    src="https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg"
                    alt="Hero Background"
                    style={styles.bgImage}
                />
            </div>

            <div style={styles.content}>
                <h1 style={styles.title}>Find Movies, TV shows and more</h1>

                <form onSubmit={handleSearch} style={styles.searchForm}>
                    <div style={styles.inputWrapper}>
                        <Search size={24} color="#999" />
                        <input
                            type="text"
                            placeholder="Enter keywords..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.searchBtn}>
                        <ArrowRight size={24} color="#fff" />
                    </button>
                </form>

                <div style={styles.socialStats}>
                    <span style={styles.shareCount}>76.8k <small>shares</small></span>

                    <div style={{ ...styles.socialBtn, background: '#3b5998' }}>
                        <Facebook size={16} fill="white" /> 19.5k
                    </div>
                    <div style={{ ...styles.socialBtn, background: '#000' }}>
                        <span style={{ fontWeight: 'bold' }}>X</span> 7.2k
                    </div>
                    <div style={{ ...styles.socialBtn, background: '#25D366' }}>
                        <MessageCircle size={16} fill="white" /> 5.6k
                    </div>
                    <div style={{ ...styles.socialBtn, background: '#0088cc' }}>
                        2.5k
                    </div>
                    <div style={{ ...styles.socialBtn, background: '#FF4500' }}>
                        2.3k
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    heroContainer: {
        position: 'relative',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(0,78,146,0.9), rgba(0,4,40,0.8))', // Blue gradient
        zIndex: 1,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.5,
    },
    content: {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '800px',
        textAlign: 'center',
        padding: '0 20px',
    },
    title: {
        color: '#fff',
        fontSize: '2.5rem',
        marginBottom: '30px',
        fontWeight: '300',
    },
    searchForm: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        maxWidth: '700px',
        margin: '0 auto 40px auto',
    },
    inputWrapper: {
        flex: 1,
        background: '#fff',
        borderRadius: '50px',
        padding: '15px 25px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    },
    input: {
        border: 'none',
        outline: 'none',
        fontSize: '1.1rem',
        flex: 1,
        color: '#333',
    },
    searchBtn: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#448aff',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 5px 15px rgba(68,138,255,0.4)',
    },
    socialStats: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
    },
    shareCount: {
        color: '#ccc',
        fontSize: '0.9rem',
        marginRight: '15px',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1,
    },
    socialBtn: {
        color: '#fff',
        padding: '5px 15px',
        borderRadius: '4px',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
    }
};

export default HomeHero;
