import React, { useState } from 'react';
import { Plus, Play, Check, ThumbsUp } from 'lucide-react';

const MovieCard = ({ movie, onClick, onPlay, onToggleFavorite, isFavorite }) => {
    // Random badge for flavor (stable across renders)
    const { quality, match } = React.useMemo(() => {
        const qualities = ['HD', '4K', 'HDR'];
        return {
            quality: qualities[Math.floor(Math.random() * qualities.length)],
            match: Math.floor(Math.random() * (99 - 80) + 80)
        };
    }, []);

    const handlePlayClick = (e) => {
        e.stopPropagation();
        onPlay(movie);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        onToggleFavorite(movie);
    };

    return (
        <div
            className="movie-card"
            style={styles.cardContainer}
            onClick={() => onClick(movie.imdbID)}
        >
            <div style={styles.posterWrapper}>
                <span className="badge">{quality}</span>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                    alt={movie.Title}
                    style={styles.poster}
                    loading="lazy"
                />

                <div className="overlay" style={styles.overlay}>
                    <div style={styles.actions}>
                        <button style={styles.actionBtn} onClick={handlePlayClick} title="Play">
                            <Play size={20} fill="black" stroke="none" />
                        </button>
                        <button style={styles.iconBtn} onClick={handleFavoriteClick} title={isFavorite ? "Remove" : "Add"}>
                            {isFavorite ? <Check size={18} color="#46d369" /> : <Plus size={18} color="white" />}
                        </button>
                    </div>
                    <div style={styles.metaBottom}>
                        <span style={{ color: '#46d369', fontWeight: '700' }}>{match}% Match</span>
                        <div style={styles.age}>16+</div>
                        <span>{(movie.Year || "").split('–')[0]}</span>
                    </div>
                    <h3 style={styles.titleHover}>{movie.Title}</h3>
                </div>
            </div>

            <div style={styles.info}>
                <h3 style={styles.title}>{movie.Title}</h3>
            </div>
        </div>
    );
};

const styles = {
    cardContainer: {
        width: '100%',
        borderRadius: '8px',
        overflow: 'visible', // Allow scale
        cursor: 'pointer',
        position: 'relative',
    },
    posterWrapper: {
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        aspectRatio: '2/3',
        marginBottom: '8px',
        backgroundColor: '#222',
    },
    poster: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '15px',
        boxSizing: 'border-box',
    },
    actions: {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px',
        alignItems: 'center',
    },
    actionBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    iconBtn: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(42,42,42,0.8)',
        border: '1px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
    },
    metaBottom: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'white',
        fontSize: '0.75rem',
        fontWeight: '500',
        marginBottom: '5px',
    },
    age: {
        border: '1px solid #aaa',
        padding: '0 4px',
        fontSize: '0.65rem',
        color: '#ccc',
    },
    titleHover: {
        color: 'white',
        fontSize: '0.9rem',
        lineHeight: '1.2',
        fontWeight: '600',
    },
    info: {
        padding: '0 2px',
    },
    title: {
        color: '#ddd',
        fontSize: '0.9rem',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
};

export default MovieCard;
