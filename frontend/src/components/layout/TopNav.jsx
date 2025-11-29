import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Menu, Search, Zap } from 'lucide-react';
import Button from '../Button';

export default function TopNav({ onMenuClick, isDemoMode, toggleDemoMode }) {
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/dashboard') return 'Dashboard';
        if (path.startsWith('/members')) return 'Team Members';
        if (path.startsWith('/tasks')) return 'Tasks & Paths';
        if (path.startsWith('/paths')) return 'Learning Paths';
        if (path === '/insights') return 'Insights';
        return 'Dashboard';
    };

    return (
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-borders flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden text-secondary-text hover:text-white">
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold text-headers">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Demo Mode Toggle */}
                <div className="hidden md:flex items-center gap-2 mr-4">
                    <span className="text-sm text-secondary-text">Demo Mode</span>
                    <button
                        onClick={toggleDemoMode}
                        className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${isDemoMode ? 'bg-primary shadow-glow' : 'bg-surfaceHighlight'}
            `}
                    >
                        <span
                            className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${isDemoMode ? 'translate-x-6' : 'translate-x-1'}
              `}
                        />
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surfaceHighlight rounded-lg border border-borders">
                    <span className="text-sm text-secondary-text">Oct 24 - Nov 23</span>
                </div>

                <button className="relative p-2 text-secondary-text hover:bg-white/5 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-background"></span>
                </button>
            </div>
        </header>
    );
}
