import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function AppLayout({ isDemoMode, toggleDemoMode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <TopNav
                    onMenuClick={() => setIsSidebarOpen(true)}
                    isDemoMode={isDemoMode}
                    toggleDemoMode={toggleDemoMode}
                />

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 min-h-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
