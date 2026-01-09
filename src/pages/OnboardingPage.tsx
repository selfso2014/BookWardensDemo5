import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useGameStore } from '../lib/store';
import type { UserRole } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle, ArrowRight } from 'lucide-react';
import '../styles/Onboarding.css';

import { initSeeso, startCalibration } from '../lib/seesoHandler';

// --- Sub-Components ---

const RoleSelection: React.FC = () => {
    const navigate = useNavigate();
    const setRole = useGameStore((state) => state.setRole);
    const [selected, setSelected] = useState<UserRole>(null);

    const handleNext = () => {
        if (selected) {
            setRole(selected);
            navigate('/onboarding/permissions');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="onboarding-card"
        >
            <h2 className="onboarding-title">Who's reading today?</h2>
            <p className="onboarding-desc">We tailor the experience and reports based on your role.</p>

            <div className="role-grid">
                <div className={`role-card ${selected === 'Student' ? 'selected' : ''}`} onClick={() => setSelected('Student')}>
                    <div className="role-icon">🎒</div>
                    <h3>Student</h3>
                </div>
                <div className={`role-card ${selected === 'Parent' ? 'selected' : ''}`} onClick={() => setSelected('Parent')}>
                    <div className="role-icon">👨‍👩‍👧</div>
                    <h3>Parent</h3>
                </div>
                <div className={`role-card ${selected === 'Adult' ? 'selected' : ''}`} onClick={() => setSelected('Adult')}>
                    <div className="role-icon">☕</div>
                    <h3>Adult Reader</h3>
                </div>
            </div>

            <button
                className="btn-primary"
                disabled={!selected}
                style={{ opacity: selected ? 1 : 0.5, width: '100%' }}
                onClick={handleNext}
            >
                Continue
            </button>
        </motion.div>
    );
};

const PermissionsCheck: React.FC = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<'IDLE' | 'REQUESTING' | 'GRANTED' | 'FAILED'>('IDLE');

    const requestPermission = async () => {
        setStatus('REQUESTING');
        try {
            const success = await initSeeso();
            if (success) {
                setStatus('GRANTED');
            } else {
                setStatus('FAILED');
            }
        } catch (e) {
            console.error(e);
            setStatus('FAILED');
        }
    };

    const handleNext = () => {
        navigate('/onboarding/calibration');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="onboarding-card"
        >
            <div className="flex-center" style={{ marginBottom: '1.5rem' }}>
                <div style={{ padding: '1.5rem', background: '#F3F4F6', borderRadius: '50%' }}>
                    <Camera size={48} color="var(--c-primary)" />
                </div>
            </div>

            <h2 className="onboarding-title">Let Iris see your eyes</h2>
            <p className="onboarding-desc">
                We use your camera to track where you are reading.
                Images are processed locally. (License Key needed for Real Mode)
            </p>

            {status !== 'GRANTED' ? (
                <button
                    className="btn-primary"
                    onClick={requestPermission}
                    style={{ width: '100%' }}
                    disabled={status === 'REQUESTING'}
                >
                    {status === 'REQUESTING' ? 'Initializing...' : 'Allow Camera Access'}
                </button>
            ) : (
                <div className="flex-center flex-col" style={{ gap: '1rem' }}>
                    <div className="flex-center text-success" style={{ gap: '0.5rem', color: 'var(--c-success)' }}>
                        <CheckCircle size={24} />
                        <span style={{ fontWeight: 600 }}>Camera Connected!</span>
                    </div>
                    <button className="btn-primary" onClick={handleNext} style={{ width: '100%' }}>
                        Start Calibration <ArrowRight size={18} style={{ marginLeft: 8, display: 'inline' }} />
                    </button>
                </div>
            )}
            {status === 'FAILED' && <p style={{ color: 'red', marginTop: '1rem' }}>Init Failed. Check Console.</p>}
        </motion.div>
    );
};

const CalibrationSimulator: React.FC = () => {
    const navigate = useNavigate();
    const completeOnboarding = useGameStore((state) => state.completeOnboarding);

    const [isCalibrating, setIsCalibrating] = useState(false);
    const [calPoint, setCalPoint] = useState<{ x: number, y: number } | null>(null);
    const [progress, setProgress] = useState(0);

    const startCal = () => {
        setIsCalibrating(true);
        startCalibration(
            (_idx, x, y) => {
                setCalPoint({ x, y });
                setProgress(0);
            },
            (prog) => {
                setProgress(prog);
            },
            () => {
                // Finish
                setCalPoint(null);
                setTimeout(() => {
                    if (!useGameStore.getState().isOnboarded) {
                        completeOnboarding();
                    }

                    // Check logic for return
                    const searchParams = new URLSearchParams(window.location.search);
                    const returnTo = searchParams.get('returnTo');
                    navigate(returnTo || '/home');
                }, 1000);
            }
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="onboarding-card"
            style={{ maxWidth: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'transparent', boxShadow: 'none' }}
        >
            {!isCalibrating ? (
                <div className="card text-center p-8 max-w-md mx-auto bg-white">
                    <h2 className="onboarding-title">Ritual of Sight</h2>
                    <p className="onboarding-desc">
                        Follow the magical dot with your eyes.<br />
                        Keep your head still!
                    </p>
                    <button className="btn-primary" onClick={startCal}>
                        Begin Ritual
                    </button>
                </div>
            ) : (
                <div className="relative w-full h-full">
                    {calPoint && (
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: 'var(--c-accent)',
                                boxShadow: '0 0 20px var(--c-accent)',
                                position: 'absolute',
                                top: calPoint.y - 20,
                                left: calPoint.x - 20,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <div style={{ width: 10, height: 10, background: 'black', borderRadius: '50%' }} />
                        </motion.div>
                    )}
                    {/* Progress Indicator just for debug/visual */}
                    <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 12px', borderRadius: '12px' }}>
                        Progress: {Math.round(progress * 100)}%
                    </div>
                </div>
            )}
        </motion.div>
    );
};

// --- Main Page ---

const OnboardingPage: React.FC = () => {
    return (
        <div className="onboarding-container">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--c-primary)', fontSize: '1.5rem' }}>
                    The Book Wardens
                </h2>
            </div>
            <AnimatePresence mode="wait">
                <Routes>
                    <Route path="role" element={<RoleSelection />} />
                    <Route path="permissions" element={<PermissionsCheck />} />
                    <Route path="calibration" element={<CalibrationSimulator />} />
                    <Route path="*" element={<RoleSelection />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default OnboardingPage;
