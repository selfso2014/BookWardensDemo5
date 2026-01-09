import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useGameStore } from '../lib/store';
import { Play, Award, Calendar } from 'lucide-react';
import '../styles/Home.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { streak, eyeTier } = useGameStore();

    const handleStartRun = () => {
        navigate('/run');
    };

    return (
        <DashboardLayout>
            <div className="home-grid">
                {/* Hero Card for Daily Run */}
                <div className="hero-card">
                    <div className="hero-pattern" />
                    <h2 className="hero-title">Today's Adventure</h2>
                    <p className="hero-subtitle">The Whispering Woods (Lv. 1)</p>

                    <button
                        className="btn-primary"
                        style={{
                            background: 'white', color: 'var(--c-primary-dark)',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                        onClick={handleStartRun}
                    >
                        <Play fill="currentColor" size={18} />
                        Start 10-min Run
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="stat-grid">
                    <div className="stat-card">
                        <span className="stat-label">Daily Streak</span>
                        <div className="flex items-center gap-2">
                            <Calendar size={20} color="var(--c-primary)" />
                            <span className="stat-value">{streak} Days</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Eye Tier</span>
                        <div className="flex items-center gap-2">
                            <Award size={20} color="var(--c-accent)" />
                            <span className="stat-value">{eyeTier}</span>
                        </div>
                    </div>
                </div>

                {/* Iris Message */}
                <div className="iris-mood-card">
                    <div style={{
                        width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--c-primary-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
                    }}>
                        🧚‍♀️
                    </div>
                    <div>
                        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Iris says:</p>
                        <p style={{ color: 'var(--c-text-sub)', fontSize: '0.85rem' }}>
                            "Ready to purify some pages? Let's go!"
                        </p>
                    </div>
                </div>

                {/* Steps Preview */}
                <div className="card">
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Today's Plan</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>
                        <div className="flex-center flex-col gap-1">
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-text-sub)' }} />
                            <span>Word</span>
                        </div>
                        <div className="flex-center flex-col gap-1">
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-text-sub)' }} />
                            <span>Read</span>
                        </div>
                        <div className="flex-center flex-col gap-1">
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-text-sub)' }} />
                            <span>Rift</span>
                        </div>
                        <div className="flex-center flex-col gap-1">
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-text-sub)' }} />
                            <span>Boss</span>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default HomePage;
