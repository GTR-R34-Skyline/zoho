import React from 'react';

const variants = {
    primary: 'bg-primary hover:bg-primary-600 text-white shadow-glow',
    secondary: 'bg-surfaceHighlight text-headers border border-borders hover:bg-surfaceHighlight/80 shadow-sm',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10',
    ghost: 'bg-transparent text-secondary-text hover:bg-white/5 hover:text-headers',
    danger: 'bg-error text-white hover:bg-red-600 shadow-sm',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) {
    return (
        <button
            className={`
        inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
