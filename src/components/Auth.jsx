import React, { useState } from 'react';
import { PlayCircle, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('filmbox_users') || '[]');

        if (isLogin) {
            // Login Logic
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                onLogin({ name: user.name, email: user.email });
            } else {
                // Check if user exists but wrong password
                const existingUser = users.find(u => u.email === email);
                if (existingUser) {
                    setError('Invalid password.');
                } else {
                    setError('Account not found. Please sign up first.');
                }
            }
        } else {
            // Signup Logic
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                setError('User already exists. Please log in.');
            } else {
                const newUser = { name: name || 'User', email, password };
                localStorage.setItem('filmbox_users', JSON.stringify([...users, newUser]));
                // Auto-login after signup
                onLogin({ name: newUser.name, email: newUser.email });
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formCard}>
                <div style={styles.header}>
                    <div style={styles.brand}>
                        <PlayCircle size={40} fill="#E50914" stroke="none" />
                        <h1 style={styles.brandName}>FILMBOX</h1>
                    </div>
                </div>

                <h2 style={styles.formTitle}>{isLogin ? 'Sign In' : 'Join the Club'}</h2>
                <p style={styles.formSubtitle}>
                    {isLogin ? 'Welcome back via the rabbit hole.' : 'Start your cinematic journey today.'}
                </p>

                {error && <p style={styles.errorText}>{error}</p>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    {!isLogin && (
                        <div style={styles.inputGroup}>
                            <User size={20} style={styles.inputIcon} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                style={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <Mail size={20} style={styles.inputIcon} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <Lock size={20} style={styles.inputIcon} />
                        <input
                            type="password"
                            placeholder="Password"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.submitBtn}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                        <ArrowRight size={20} />
                    </button>
                </form>

                <p style={styles.switchText}>
                    {isLogin ? "New here? " : "One of us? "}
                    <span style={styles.switchLink} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Create Account' : 'Log In'}
                    </span>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        zIndex: 10, // Ensure it sits above background but below toasts? No, standard flow.
    },
    formCard: {
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        // Glassmorphism
        backgroundColor: 'rgba(20, 20, 20, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    brandName: {
        fontSize: '1.8rem',
        fontWeight: '800',
        letterSpacing: '-0.5px',
        color: '#fff',
    },
    formTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '8px',
        textAlign: 'center',
        background: 'linear-gradient(to right, #fff, #aaa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    formSubtitle: {
        color: 'var(--filmbox-text-dim)',
        marginBottom: '32px',
        textAlign: 'center',
        fontSize: '0.95rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    inputGroup: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#666',
        pointerEvents: 'none',
    },
    input: {
        width: '100%',
        padding: '14px 14px 14px 48px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s',
    },
    submitBtn: {
        backgroundColor: '#E50914',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '14px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '12px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 12px rgba(229, 9, 20, 0.3)',
    },
    switchText: {
        textAlign: 'center',
        marginTop: '24px',
        color: '#888',
        fontSize: '0.9rem',
    },
    switchLink: {
        color: '#fff',
        cursor: 'pointer',
        fontWeight: '600',
        marginLeft: '4px',
        textDecoration: 'underline',
        textDecorationColor: 'rgba(229, 9, 20, 0.5)',
    },
    errorText: {
        color: '#ff4b4b',
        textAlign: 'center',
        marginBottom: '15px',
        fontSize: '0.9rem',
        fontWeight: '500',
        backgroundColor: 'rgba(255, 75, 75, 0.1)',
        padding: '8px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 75, 75, 0.3)',
    }
};

export default Auth;
