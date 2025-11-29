import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, Map, PieChart, Menu, X, Settings, MessageSquare } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Members', path: '/members', icon: Users },
        { name: 'Tasks & Paths', path: '/tasks', icon: CheckSquare },
        { name: 'Insights', path: '/insights', icon: PieChart },
        { name: 'Chat', path: '/chat', icon: MessageSquare },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-20 bg-black/80 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-surface border-r border-borders transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-borders">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-glow">
                            <span className="text-white font-bold text-xl">Z</span>
                        </div>
                        <span className="text-xl font-bold text-headers">Zoho<span className="text-primary">LMS</span></span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-secondary-text hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
                ${isActive
                                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                                    : 'text-secondary-text hover:bg-white/5 hover:text-headers'
                                }
              `}
                            onClick={() => setIsOpen(false)}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-borders bg-surface/50 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="User"
                            className="w-10 h-10 rounded-full border border-borders"
                        />
                        <div>
                            <p className="text-sm font-medium text-headers">Admin User</p>
                            <p className="text-xs text-secondary-text">admin@zoho.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
