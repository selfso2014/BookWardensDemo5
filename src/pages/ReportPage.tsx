import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useGameStore } from '../lib/store';
import { BarChart, Activity, Clock, BookOpen } from 'lucide-react';

const ReportPage: React.FC = () => {
    const { streak, eyeTier } = useGameStore();

    // Mock Data for Charts
    const weeklyActivity = [
        { day: 'Mon', value: 10 },
        { day: 'Tue', value: 20 },
        { day: 'Wed', value: 15 },
        { day: 'Thu', value: 30 },
        { day: 'Fri', value: 25 },
        { day: 'Sat', value: 40 },
        { day: 'Sun', value: 35 },
    ];

    const maxVal = Math.max(...weeklyActivity.map(d => d.value));

    return (
        <DashboardLayout>
            <div style={{ padding: '0 1rem 5rem 1rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text-main)' }}>
                        <BarChart size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-4px' }} />
                        Warden's Report
                    </h2>
                    <p style={{ color: 'var(--c-text-sub)' }}>
                        Track your reading journey and stats.
                    </p>
                </div>

                {/* Summary Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--c-text-sub)', fontSize: '0.85rem' }}>
                            <Clock size={16} />
                            <span>Total Time</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>2h 45m</span>
                    </div>
                    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--c-text-sub)', fontSize: '0.85rem' }}>
                            <BookOpen size={16} />
                            <span>Pages Purified</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>142</span>
                    </div>
                    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--c-text-sub)', fontSize: '0.85rem' }}>
                            <Activity size={16} />
                            <span>Current Streak</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-primary)' }}>{streak} Days</span>
                    </div>
                    <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--c-text-sub)', fontSize: '0.85rem' }}>
                            <span>🏆</span>
                            <span>Eye Tier</span>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--c-accent)' }}>{eyeTier}</span>
                    </div>
                </div>

                {/* Weekly Chart */}
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Weekly Activity (Min)</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px', paddingTop: '1rem' }}>
                        {weeklyActivity.map((d) => (
                            <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                <div
                                    style={{
                                        width: '12px',
                                        height: `${(d.value / maxVal) * 100}%`,
                                        backgroundColor: 'var(--c-primary)',
                                        borderRadius: '4px',
                                        opacity: d.value === maxVal ? 1 : 0.6,
                                        transition: 'height 0.5s ease'
                                    }}
                                />
                                <span style={{ fontSize: '0.75rem', color: 'var(--c-text-sub)' }}>{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Logs */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #F3F4F6', fontWeight: 700 }}>Recent Clears</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '1rem', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Chapter 1: The Beginning</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>Just now</div>
                            </div>
                            <span style={{ color: 'var(--c-success)', fontSize: '0.9rem', fontWeight: 600 }}>+100 Ink</span>
                        </div>
                        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tutorial: Word Sprint</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--c-text-sub)' }}>Yesterday</div>
                            </div>
                            <span style={{ color: 'var(--c-success)', fontSize: '0.9rem', fontWeight: 600 }}>+50 Ink</span>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default ReportPage;
