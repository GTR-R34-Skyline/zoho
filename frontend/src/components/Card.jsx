import React from 'react';

export default function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`bg-surface rounded-xl shadow-card border border-borders p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
