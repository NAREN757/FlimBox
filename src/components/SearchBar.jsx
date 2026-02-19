import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <motion.div
                style={styles.container}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                whileFocus={{ scale: 1.02 }}
            >
                <Search color="#a0a0a0" size={20} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Search</button>
            </motion.div>
        </form>
    );
};

const styles = {
    form: {
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto 2rem auto',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--card-background)',
        padding: '8px 16px',
        borderRadius: 'var(--border-radius)',
        border: '1px solid #333',
    },
    input: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        padding: '0 12px',
        outline: 'none',
        fontSize: '1rem',
    },
    button: {
        background: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    }
};

export default SearchBar;
