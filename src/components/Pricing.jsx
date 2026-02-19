import React from 'react';

const Pricing = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Choose your plan</h2>
            <p style={styles.subheading}>Watch all you want. Recommendations just for you.</p>

            <div style={styles.grid}>
                <PricingCard
                    title="Gold Plan"
                    price="$9.99"
                    features={['No Ads', 'Team watching up to 10', '720p Resolution']}
                />
                <PricingCard
                    title="Platinum Plan"
                    price="$29.99"
                    active
                    features={['Unlimited movies', 'No Ads', '4K+HDR Resolution', '300 Downloading']}
                />
                <PricingCard
                    title="Diamond Plan"
                    price="$19.99"
                    features={['Unlimited movies', 'Team watching up to 20', '1080p Resolution']}
                />
            </div>
        </div>
    );
};

const PricingCard = ({ title, price, features, active }) => (
    <div style={{ ...styles.card, ...(active ? styles.activeCard : {}) }}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <div style={{ ...styles.price, ...(active ? styles.activePrice : {}) }}>
            {price}<span style={styles.period}>/month</span>
        </div>

        <ul style={styles.features}>
            {features.map((f, i) => (
                <li key={i} style={styles.featureItem}>• {f}</li>
            ))}
        </ul>

        {active && <div style={styles.glow} />}
    </div>
);

const styles = {
    container: {
        padding: '60px 0',
        textAlign: 'center',
        color: 'white',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '10px',
    },
    subheading: {
        color: '#666',
        marginBottom: '40px',
        fontSize: '0.9rem',
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'wrap',
    },
    card: {
        background: '#141414',
        borderRadius: '20px',
        padding: '40px 30px',
        width: '280px',
        textAlign: 'left',
        position: 'relative',
        transition: 'transform 0.3s',
        border: '1px solid transparent',
    },
    activeCard: {
        background: '#1a1a1a',
        transform: 'scale(1.05)',
        border: '1px solid #333',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    },
    cardTitle: {
        fontSize: '1.1rem',
        marginBottom: '20px',
        color: '#fff',
    },
    price: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#d4af37', // Gold color fallback
        marginBottom: '30px',
    },
    activePrice: {
        color: 'var(--filmbox-red)', // Red for active
    },
    period: {
        fontSize: '0.8rem',
        color: '#666',
        fontWeight: 'normal',
    },
    features: {
        listStyle: 'none',
        padding: 0,
    },
    featureItem: {
        color: '#aaa',
        marginBottom: '10px',
        fontSize: '0.85rem',
        lineHeight: '1.5',
    },
    glow: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '5px',
        background: 'var(--filmbox-red)',
        boxShadow: '0 0 20px var(--filmbox-red)',
        borderRadius: '10px',
    }
};

export default Pricing;
