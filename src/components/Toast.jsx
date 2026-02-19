import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={18} color="#46d369" />;
            case 'error': return <AlertCircle size={18} color="#ff4444" />;
            default: return <Info size={18} color="#666" />;
        }
    };

    return (
        <div style={{
            ...styles.toast,
            borderLeft: `4px solid ${type === 'success' ? '#46d369' : type === 'error' ? '#ff4444' : '#666'}`
        }}>
            <div style={styles.iconWrapper}>{getIcon()}</div>
            <span style={styles.message}>{message}</span>
            <button onClick={onClose} style={styles.closeBtn}>
                <X size={14} color="#888" />
            </button>
        </div>
    );
};

const styles = {
    toast: {
        display: 'flex',
        alignItems: 'center',
        background: '#1f1f1f',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        marginBottom: '10px',
        minWidth: '280px',
        maxWidth: '350px',
        animation: 'slideIn 0.3s ease-out',
        position: 'relative',
        zIndex: 9999,
    },
    iconWrapper: {
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
    },
    message: {
        flex: 1,
        fontSize: '0.9rem',
        marginRight: '10px',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
    }
};

export default Toast;
