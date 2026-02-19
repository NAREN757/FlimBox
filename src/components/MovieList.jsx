import React from 'react';
import { motion } from 'framer-motion';

const MovieList = ({ movies, onSelectMovie }) => {
    return (
        <div style={styles.grid}>
            {movies.map((movie) => (
                <motion.div
                    key={movie.imdbID}
                    style={styles.card}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => onSelectMovie(movie.imdbID)}
                    layoutId={`poster-${movie.imdbID}`}
                >
                    <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                        alt={movie.Title}
                        style={styles.poster}
                    />
                    <div style={styles.info}>
                        <h3 style={styles.title}>{movie.Title}</h3>
                        <p style={styles.year}>{movie.Year}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '24px',
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    card: {
        backgroundColor: 'var(--card-background)',
        borderRadius: 'var(--border-radius)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
    },
    poster: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
    },
    info: {
        padding: '12px',
    },
    title: {
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    year: {
        color: 'var(--secondary-text-color)',
        fontSize: '0.9rem',
    }
};

export default MovieList;
