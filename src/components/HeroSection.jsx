import React from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, Check } from 'lucide-react';

const HeroSection = ({ movie, onPlay, onToggleList, isInList }) => {
    if (!movie) return null;

    return (
        <div style={styles.heroContainer}>
            {/* Ambient Blurred Background */}
            <div style={styles.ambientBackground}>
                <img
                    src={movie.Poster}
                    alt="Background"
                    style={styles.blurImage}
                />
                <div style={styles.gradientOverlay}></div>
            </div>

            {/* Split Content Layout */}
            <div style={styles.contentWrapper}>
                {/* Left: Typography & Actions */}
                <motion.div
                    style={styles.textContent}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: {
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 0.8,
                                staggerChildren: 0.1,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    <div style={styles.metaBadge}>
                        <span style={styles.quality}>4K ULTRA HD</span>
                        <span style={styles.rating}>{movie.Rated || 'PG-13'}</span>
                    </div>

                    <h1 style={styles.heroTitle} className="shimmer-text">
                        {movie.Title.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                style={{ display: 'inline-block', minWidth: char === ' ' ? '10px' : 'auto' }}
                                variants={{
                                    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0px)',
                                        transition: { type: 'spring', damping: 12, stiffness: 100 }
                                    }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    <div style={styles.metaData}>
                        <span>{movie.Year}</span>
                        <span style={styles.dot}>•</span>
                        <span>{movie.Genre}</span>
                        <span style={styles.dot}>•</span>
                        <span>{movie.Runtime}</span>
                    </div>

                    <p style={styles.plotSummary}>{movie.Plot}</p>

                    <div style={styles.actionButtons}>
                        <motion.button
                            style={styles.btnPrimary}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 30px rgba(0, 242, 255, 0.6)',
                                textShadow: '0 0 8px rgba(255,255,255,0.8)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onPlay(movie)}
                        >
                            <Play size={20} fill="black" /> WATCH NOW
                        </motion.button>

                        <motion.button
                            style={isInList ? styles.btnSecondaryActive : styles.btnSecondary}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                borderColor: 'var(--primary-color)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onToggleList(movie)}
                        >
                            {isInList ? <Check size={20} className="text-cyan-400" /> : <Plus size={20} />}
                            {isInList ? 'IN LIST' : 'ADD TO LIST'}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right: Floating Prism Poster */}
                <motion.div
                    style={styles.posterWrapper}
                    initial={{ opacity: 0, y: 50, rotateY: 10 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div style={styles.posterGlass}>
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : ''}
                            alt={movie.Title}
                            style={styles.posterImage}
                        />
                        <div style={styles.posterReflection}></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const styles = {
    heroContainer: {
        position: 'relative',
        height: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: '-80px', // Compensate for nav
    },
    ambientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    blurImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'blur(80px) brightness(0.4)', // Heavy blur for atmosphere
        transform: 'scale(1.2)',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, var(--background-color) 100%), linear-gradient(to top, var(--background-color) 10%, transparent 60%)',
    },
    contentWrapper: {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        gap: '60px',
    },
    textContent: {
        flex: 1,
        color: 'white',
        maxWidth: '600px',
    },
    heroTitle: {
        fontSize: '4.5rem',
        fontFamily: 'var(--font-heading)',
        lineHeight: 0.9,
        marginBottom: '24px',
        textShadow: '0 0 30px rgba(0, 242, 255, 0.3)', // Neon glow
        background: 'linear-gradient(to right, #fff, #a0a0a0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    metaBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        fontSize: '0.8rem',
        fontWeight: '700',
        letterSpacing: '1px',
    },
    quality: {
        background: 'rgba(255,255,255,0.1)',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid rgba(255,255,255,0.2)',
    },
    rating: {
        color: 'var(--primary-color)',
    },
    metaData: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '1rem',
        color: '#ccc',
        marginBottom: '24px',
        fontFamily: 'var(--font-body)',
    },
    dot: {
        color: 'var(--primary-color)',
    },
    plotSummary: {
        fontSize: '1.1rem',
        lineHeight: 1.7,
        color: '#b0b0b0',
        marginBottom: '40px',
        fontFamily: 'var(--font-body)',
        fontWeight: '300',
    },
    actionButtons: {
        display: 'flex',
        gap: '20px',
    },
    btnPrimary: {
        background: 'var(--primary-color)',
        color: 'black',
        border: 'none',
        padding: '16px 40px',
        fontSize: '1rem',
        fontWeight: '700',
        borderRadius: '50px', // Capsule shape
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0 0 20px rgba(0, 242, 255, 0.4)',
    },
    btnSecondary: {
        background: 'rgba(255,255,255,0.05)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.2)',
        padding: '16px 32px',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
    },
    btnSecondaryActive: {
        background: 'rgba(0, 242, 255, 0.1)',
        color: 'var(--primary-color)',
        border: '1px solid var(--primary-color)',
        padding: '16px 32px',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
    },
    posterWrapper: {
        flex: '0 0 350px',
        perspective: '1000px', // For 3D tilt
    },
    posterGlass: {
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        transform: 'rotateY(-5deg)', // Slight permanent tilt
        transition: 'transform 0.3s ease',
    },
    posterImage: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    posterReflection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
    }
};

export default HeroSection;
