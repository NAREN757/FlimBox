import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onSelect, onPlay, onToggle, favorites }) => {
    const rowRef = useRef(null);
    const [showControls, setShowControls] = useState(false);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth + 100 : current.offsetWidth - 100;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div
            style={styles.rowContainer}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <h2 style={styles.title}>{title}</h2>

            <div style={styles.group}>
                <button
                    style={{ ...styles.handleLeft, opacity: showControls ? 1 : 0 }}
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft size={40} color="white" />
                </button>

                <div style={styles.row} ref={rowRef} className="hide-scrollbar">
                    {movies.map(movie => (
                        <div key={movie.imdbID} style={styles.item}>
                            <MovieCard
                                movie={movie}
                                onClick={onSelect}
                                onPlay={onPlay}
                                onToggleFavorite={onToggle}
                                isFavorite={favorites && favorites.some(f => f.imdbID === movie.imdbID)}
                            />
                        </div>
                    ))}
                </div>

                <button
                    style={{ ...styles.handleRight, opacity: showControls ? 1 : 0 }}
                    onClick={() => scroll('right')}
                >
                    <ChevronRight size={40} color="white" />
                </button>
            </div>
        </div>
    );
};

const styles = {
    rowContainer: {
        marginBottom: '40px',
        position: 'relative',
    },
    title: {
        color: '#e5e5e5',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        marginLeft: '60px', // Align with main padding
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    },
    group: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    row: {
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollBehavior: 'smooth',
        padding: '0 60px', // Match main padding
        gap: '15px',
    },
    item: {
        flex: '0 0 auto',
        width: '200px',
        transition: 'transform 0.3s',
    },
    handleLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '60px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        border: 'none',
        zIndex: 20,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease-in-out',
        outline: 'none',
    },
    handleRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '60px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        border: 'none',
        zIndex: 20,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease-in-out',
        outline: 'none',
    }
};

export default MovieRow;
