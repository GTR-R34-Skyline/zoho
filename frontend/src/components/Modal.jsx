import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-surface rounded-xl shadow-2xl border border-borders transform transition-all">
                <div className="flex items-center justify-between p-4 border-b border-borders">
                    <h3 className="text-lg font-semibold text-headers">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-secondary-text hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
