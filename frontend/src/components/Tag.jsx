import React from 'react';

const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
};

export default function Tag({ label, variant = 'default', className = '' }) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {label}
        </span>
    );
}
