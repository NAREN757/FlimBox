import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, Plus, Check, Star, Calendar, Clock, ThumbsUp } from 'lucide-react';

const MovieInfoModal = ({ movie, onClose, onPlay, onToggleFavorite, isFavorite }) => {
    if (!movie) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={styles.modal}
                onClick={e => e.stopPropagation()}
            >
                <div style={styles.header}>
                    <img
                        src={movie.Backdrop || movie.Poster}
                        alt={movie.Title}
                        style={styles.backdrop}
                    />
                    <div style={styles.gradient}></div>
                    <button style={styles.closeBtn} onClick={onClose}>
                        <X size={24} color="white" />
                    </button>

                    <div style={styles.titleSection}>
                        <h2 style={styles.title}>{movie.Title}</h2>
                        <div style={styles.metaRow}>
                            <span style={styles.match}>98% Match</span>
                            <span style={styles.metaItem}>{movie.Year}</span>
                            <span style={styles.ratingBadge}>{movie.Rated || 'PG-13'}</span>
                            <span style={styles.metaItem}>{movie.Runtime || '1h 45m'}</span>
                            <span style={styles.hdBadge}>HD</span>
                        </div>

                        <div style={styles.actionRow}>
                            <button style={styles.playBtn} onClick={() => onPlay(movie)}>
                                <Play size={24} fill="black" /> Play
                            </button>
                            <button style={styles.roundBtn} onClick={() => onToggleFavorite(movie)}>
                                {isFavorite ? <Check size={24} color="#46d369" /> : <Plus size={24} color="white" />}
                            </button>
                            <button style={styles.roundBtn}>
                                <ThumbsUp size={24} color="white" />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={styles.content}>
                    <div style={styles.mainCol}>
                        <div style={styles.metaInfo}>
                            <div style={styles.infoItem}>
                                <Star size={18} color="#e50914" fill="#e50914" />
                                <span>{movie.Rating || '8.5'} / 10</span>
                            </div>
                            <div style={styles.infoItem}>
                                <Calendar size={18} color="#aaa" />
                                <span>{movie.Year}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <Clock size={18} color="#aaa" />
                                <span>{movie.Runtime || 'Unknown'}</span>
                            </div>
                        </div>

                        <p style={styles.plot}>{movie.Plot || "No description available for this title."}</p>
                    </div>

                    <div style={styles.sideCol}>
                        <div style={styles.detailItem}>
                            <span style={styles.label}>Genre:</span>
                            <span style={styles.value}>{movie.Genre}</span>
                        </div>
                        <div style={styles.detailItem}>
                            <span style={styles.label}>Actors:</span>
                            <span style={styles.value}>{movie.Actors || 'N/A'}</span>
                        </div>
                        <div style={styles.detailItem}>
                            <span style={styles.label}>Director:</span>
                            <span style={styles.value}>{movie.Director || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '20px',
    },
    modal: {
        width: '90%',
        maxWidth: '900px',
        backgroundColor: '#181818',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        position: 'relative',
        height: '450px',
    },
    backdrop: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, #181818 0%, transparent 60%)',
    },
    closeBtn: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#181818',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 20,
    },
    titleSection: {
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        right: '40px',
        zIndex: 10,
    },
    title: {
        color: 'white',
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
    },
    metaRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
        color: 'white',
        fontSize: '1rem',
    },
    match: {
        color: '#46d369',
        fontWeight: 'bold',
    },
    ratingBadge: {
        border: '1px solid #888',
        padding: '2px 5px',
        fontSize: '0.8rem',
    },
    hdBadge: {
        border: '1px solid #888',
        borderRadius: '3px',
        padding: '2px 5px',
        fontSize: '0.7rem',
    },
    actionRow: {
        display: 'flex',
        gap: '15px',
    },
    playBtn: {
        backgroundColor: 'white',
        color: 'black',
        border: 'none',
        padding: '10px 25px',
        borderRadius: '4px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
    },
    roundBtn: {
        backgroundColor: 'rgba(42,42,42,0.6)',
        border: '2px solid rgba(255,255,255,0.5)',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        ':hover': {
            borderColor: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)'
        }
    },
    content: {
        padding: '0 40px 40px 40px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '40px',
        color: 'white',
    },
    metaInfo: {
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
        fontSize: '1rem',
        color: '#aaa',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    plot: {
        lineHeight: 1.6,
        fontSize: '1.1rem',
        color: '#ddd',
    },
    sideCol: {
        fontSize: '0.95rem',
        lineHeight: 1.6,
    },
    detailItem: {
        marginBottom: '10px',
    },
    label: {
        color: '#777',
        marginRight: '8px',
    },
    value: {
        color: '#ddd',
    }
};

export default MovieInfoModal;
