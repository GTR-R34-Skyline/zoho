import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-error" />,
    info: <Info className="w-5 h-5 text-primary" />
};

const styles = {
    success: "bg-surface border-success/20",
    error: "bg-surface border-error/20",
    info: "bg-surface border-primary/20"
};

export default function Toast({ id, type = 'info', message, onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);
        return () => clearTimeout(timer);
    }, [id, onClose, duration]);

    return (
        <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg animate-slide-in-right min-w-[300px] ${styles[type]}`}>
            {icons[type]}
            <p className="text-sm font-medium text-headers flex-1">{message}</p>
            <button onClick={() => onClose(id)} className="text-secondary-text hover:text-headers">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
