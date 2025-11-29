import React from 'react';

export default function Avatar({ src, alt, initials, size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary/10 ${sizeClasses[size]} ${className}`}>
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
                <span className="font-medium text-primary">{initials}</span>
            )}
        </div>
    );
}
