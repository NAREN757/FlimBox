import React, { useMemo } from 'react';
import '../index.css';

const FloatingParticles = () => {
    // Generate a fixed number of particles with random properties
    const particles = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // 0-100%
            top: Math.random() * 100,  // 0-100%
            size: Math.random() * 4 + 1, // 1-5px
            duration: Math.random() * 20 + 10, // 10-30s
            delay: Math.random() * 5, // 0-5s
            opacity: Math.random() * 0.5 + 0.1, // 0.1-0.6
        }));
    }, []);

    return (
        <div className="floating-particles-container">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        opacity: p.opacity,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
