import React from 'react';
import { Play, Plus, Check, Info } from 'lucide-react';

const FilmBoxHero = ({ movie, onPlay, onToggleFavorite, isFavorite, totalItems = 0, currentIndex = 0, onDotClick }) => {
    // Fallback if no movie loaded yet
    const displayMovie = movie || {
        Title: 'The Batman',
        Year: '2022',
        Rated: 'PG-13',
        Genre: 'Fantasy',
        Plot: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
        Poster: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg', // Use Poster as fallback
        Backdrop: 'https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5Bmxkq7QvDSW.jpg' // Batman Backdrop
    };

    const bgImage = displayMovie.Backdrop || displayMovie.Poster;

    return (
        <div style={{ ...styles.hero, backgroundImage: `url(${bgImage})` }}>
            <div style={styles.overlay}>
                <div style={styles.content}>

                    <span style={styles.tag}>FILM OF THE MONTH</span>
                    <h1 style={styles.title}>{displayMovie.Title}</h1>

                    <div style={styles.meta}>
                        <div style={styles.rating}>
                            <span style={{ color: '#ffc107' }}>★★★★☆</span>
                            <span style={{ marginLeft: '8px' }}>{displayMovie.Rating}</span>
                        </div>
                        <span style={styles.dot}>•</span>
                        <span>{displayMovie.Year}</span>
                        <span style={styles.dot}>•</span>
                        <span>{displayMovie.Genre}</span>
                        <span style={styles.dot}>•</span>
                        <span>{displayMovie.Runtime || '2h 56m'}</span>
                    </div>

                    <p style={styles.plot}>{displayMovie.Plot}</p>

                    <div style={styles.actions}>
                        <button style={styles.btnPrimary} onClick={onPlay}>
                            <Play size={20} fill="currentColor" style={{ marginRight: '8px' }} />
                            Watch Trailer
                        </button>
                        <button
                            style={{ ...styles.btnSecondary, ...(isFavorite ? styles.btnActive : {}) }}
                            onClick={onToggleFavorite}
                        >
                            {isFavorite ? <Check size={20} /> : <Plus size={20} />}
                            <span style={{ marginLeft: '8px' }}>My List</span>
                        </button>
                        <button style={styles.btnGlass}>
                            <Info size={20} />
                            <span style={{ marginLeft: '8px' }}>More Info</span>
                        </button>
                    </div>
                </div>

                {/* Carousel Dots */}
                {totalItems > 1 && (
                    <div style={styles.dotsContainer}>
                        {Array.from({ length: totalItems }).map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    ...styles.carouselDot,
                                    ...(idx === currentIndex ? styles.carouselDotActive : {})
                                }}
                                onClick={() => onDotClick(idx)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    hero: {
        position: 'relative',
        width: '100%',
        height: '85vh', // Taller, more cinematic
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        marginTop: '0', // Reset
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, #0f0f0f 10%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%), linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 50%, rgba(0,0,0,0.8) 100%)', // Vignette + bottom fade
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
    },
    content: {
        maxWidth: '900px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        zIndex: 10,
        marginTop: '60px', // Push down slightly from header
    },
    tag: {
        fontSize: '0.9rem',
        color: 'var(--filmbox-red)',
        letterSpacing: '3px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textTransform: 'uppercase',
        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
    },
    title: {
        fontSize: '5rem', // Branding size
        fontWeight: '900',
        lineHeight: 1.1,
        marginBottom: '20px',
        fontFamily: 'var(--font-main)',
        textShadow: '0 4px 10px rgba(0,0,0,0.8)',
        letterSpacing: '-1px',
    },
    meta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        color: '#e0e0e0',
        fontSize: '1rem',
        marginBottom: '25px',
        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
    },
    dot: { color: 'var(--filmbox-red)' },
    rating: {
        display: 'flex',
        alignItems: 'center',
    },
    plot: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        color: '#ccc',
        marginBottom: '40px',
        maxWidth: '700px',
        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
    },
    actions: {
        display: 'flex',
        gap: '20px',
    },
    btnPrimary: {
        background: 'var(--filmbox-red)',
        color: 'white',
        border: 'none',
        padding: '14px 32px',
        borderRadius: '50px',
        fontSize: '1.1rem',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 0 20px rgba(229, 9, 20, 0.4)',
        transition: 'transform 0.2s',
    },
    btnSecondary: {
        background: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '14px 28px',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        transition: 'background 0.2s',
    },
    btnGlass: {
        background: 'rgba(100,100,100,0.3)',
        color: 'white',
        border: 'none',
        padding: '14px 28px',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
    },
    btnActive: {
        background: 'rgba(255,255,255,0.9)',
        color: 'black',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: '130px', // Moved up to avoid overlap with negative margin content
        display: 'flex',
        gap: '10px',
        zIndex: 100, // Increased z-index
        padding: '10px',
        borderRadius: '20px',
        background: 'rgba(0,0,0,0.3)', // Semi-transparent background to make dots pop
        backdropFilter: 'blur(4px)',
    },
    carouselDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
    },
    carouselDotActive: {
        backgroundColor: '#fff',
        transform: 'scale(1.3)',
        boxShadow: '0 0 8px rgba(255,255,255,0.6)',
    }
};

export default FilmBoxHero;
