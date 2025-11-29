import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <label className="mb-1 text-sm font-medium text-secondary-text">
                    {label}
                </label>
            )}
            <input
                className={`
          px-3 py-2 bg-background border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors text-headers placeholder-secondary-text/50
          ${error ? 'border-error focus:border-error focus:ring-error/50' : 'border-borders focus:border-primary'}
          disabled:bg-surfaceHighlight disabled:text-gray-500
        `}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-error">{error}</p>}
        </div>
    );
}
