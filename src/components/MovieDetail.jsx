import React from 'react';
import { motion } from 'framer-motion';
import { Star, X, Play, Share2, Plus, Check } from 'lucide-react';

const MovieDetail = ({ movie, onBack, onToggleList, isInList }) => {
    if (!movie) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.overlay}
        >
            <div style={styles.backdrop}>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : ''}
                    alt={movie.Title}
                    style={styles.backdropImage}
                />
                <div style={styles.gradient}></div>
            </div>

            <div style={styles.modalContent}>
                <button onClick={onBack} style={styles.closeButton}>
                    <X size={24} color="white" />
                </button>

                <div style={styles.contentGrid}>
                    <div style={styles.leftCol}>
                        <motion.h1
                            style={styles.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            {movie.Title}
                        </motion.h1>

                        <div style={styles.meta}>
                            <span style={styles.matchScore}>98% Match</span>
                            <span style={styles.year}>{movie.Year}</span>
                            <span style={styles.ratingBox}>{movie.Rated}</span>
                            <span style={styles.duration}>{movie.Runtime}</span>
                            <span style={styles.hdBadge}>HD</span>
                        </div>

                        <div style={styles.actions}>
                            <button style={styles.playBtn}>
                                <Play size={24} fill="black" /> Play
                            </button>
                            <button
                                style={styles.roundBtn}
                                onClick={() => onToggleList(movie)}
                            >
                                {isInList ? <Check size={24} color="#FFD700" /> : <Plus size={24} />}
                            </button>
                            <button style={styles.roundBtn}>
                                <Share2 size={24} />
                            </button>
                        </div>

                        <h3 style={styles.sectionTitle}>Plot</h3>
                        <p style={styles.plot}>{movie.Plot}</p>

                        <div style={styles.extraDetails}>
                            <p><strong>Director:</strong> <span style={styles.highlight}>{movie.Director}</span></p>
                            <p><strong>Genre:</strong> <span style={styles.highlight}>{movie.Genre}</span></p>
                        </div>
                    </div>

                    <div style={styles.rightCol}>
                        <div style={styles.castSection}>
                            <h3 style={styles.sectionTitle}>Cast</h3>
                            <div style={styles.castList}>
                                {movie.Actors.split(', ').map(actor => (
                                    <div key={actor} style={styles.actor}>{actor}</div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.ratings}>
                            <div style={styles.imdbRating}>
                                <Star fill="#E5C100" color="#E5C100" size={20} />
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{movie.imdbRating}</span>
                                <span style={{ color: '#666' }}>/10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#0a0a0a',
        zIndex: 100,
        overflowY: 'auto',
    },
    backdrop: {
        position: 'relative',
        height: '60vh',
        width: '100%',
    },
    backdropImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 20%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, #0a0a0a 10%, transparent 100%)',
    },
    modalContent: {
        position: 'relative',
        maxWidth: '1200px',
        margin: '-100px auto 0',
        padding: '0 40px 60px',
        zIndex: 10,
    },
    closeButton: {
        position: 'absolute',
        top: '-40vh',
        right: '40px',
        background: 'rgba(0,0,0,0.5)',
        border: '2px solid rgba(255,255,255,0.2)',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 200,
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '60px',
    },
    title: {
        fontSize: '4rem',
        marginBottom: '24px',
        lineHeight: 1.1,
        fontFamily: 'var(--font-heading)',
    },
    meta: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '32px',
        fontSize: '1.1rem',
        color: '#ccc',
    },
    matchScore: {
        color: '#46d369',
        fontWeight: 'bold',
    },
    ratingBox: {
        border: '1px solid #666',
        padding: '0 6px',
        fontSize: '0.8rem',
    },
    hdBadge: {
        border: '1px solid #666',
        borderRadius: '4px',
        padding: '0 6px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
    },
    actions: {
        display: 'flex',
        gap: '16px',
        marginBottom: '40px',
    },
    playBtn: {
        background: 'white',
        color: 'black',
        border: 'none',
        padding: '12px 32px',
        borderRadius: '4px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
    },
    roundBtn: {
        background: 'transparent',
        border: '2px solid #666',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '16px',
        borderLeft: '4px solid var(--primary-color)',
        paddingLeft: '12px',
        color: 'white',
    },
    plot: {
        fontSize: '1.2rem',
        lineHeight: 1.6,
        color: '#ddd',
        marginBottom: '32px',
        maxWidth: '90%',
    },
    extraDetails: {
        color: '#888',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    highlight: {
        color: '#fff',
    },
    castList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '40px',
    },
    actor: {
        background: '#222',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '0.9rem',
        color: '#ddd',
    },
    ratings: {
        background: '#1a1a1a',
        padding: '24px',
        borderRadius: '8px',
    },
    imdbRating: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
    }
};

export default MovieDetail;
