import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Sparkles, Backpack, BarChart2, Bell } from 'lucide-react';
import { useGameStore } from '../../lib/store';
import '../../styles/Layout.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { ink, runes } = useGameStore();
    // removed navigate usage

    return (
        <div className="dashboard-layout">
            {/* Top Header (Simple) */}
            <header style={{
                height: '60px', background: 'white', padding: '0 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid #E5E7EB'
            }}>
                <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Libraria</h1>
                <div className="flex-center" style={{ gap: '1rem' }}>
                    <div className="flex-center" style={{ gap: '0.25rem', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--c-primary)' }}>💧 {ink}</span>
                        <span style={{ color: 'var(--c-accent)' }}>✨ {runes}</span>
                    </div>
                    <Bell size={20} color="var(--c-text-sub)" />
                </div>
            </header>

            <main className="dashboard-content">
                {children}
            </main>

            <nav className="bottom-nav">
                <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Home size={24} />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/dungeon" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Map size={24} />
                    <span>Atlas</span>
                </NavLink>
                <NavLink to="/iris" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Sparkles size={24} />
                    <span>Iris</span>
                </NavLink>
                <NavLink to="/inventory" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Backpack size={24} />
                    <span>Bag</span>
                </NavLink>
                <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <BarChart2 size={24} />
                    <span>Report</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default DashboardLayout;
