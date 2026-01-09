import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useGameStore } from '../lib/store';
import type { UserRole } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import '../styles/Onboarding.css';

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
    const [granted, setGranted] = useState(false);

    const requestScale = () => {
        // Mock permission grant
        setTimeout(() => {
            setGranted(true);
        }, 800);
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
                Images are processed locally and never sent to a server.
            </p>

            {!granted ? (
                <button className="btn-primary" onClick={requestScale} style={{ width: '100%' }}>
                    Allow Camera Access
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
        </motion.div>
    );
};

const CalibrationSimulator: React.FC = () => {
    const navigate = useNavigate();
    const completeOnboarding = useGameStore((state) => state.completeOnboarding);
    const [step, setStep] = useState(0); // 0..5 (5 points)
    const [isCalibrating, setIsCalibrating] = useState(false);

    // Simulation of calibration points
    useEffect(() => {
        if (isCalibrating) {
            if (step < 5) {
                const timer = setTimeout(() => {
                    setStep(prev => prev + 1);
                }, 1500); // 1.5s per point
                return () => clearTimeout(timer);
            } else {
                // Done
                setTimeout(() => {
                    completeOnboarding();
                    navigate('/home');
                }, 1000);
            }
        }
    }, [isCalibrating, step, completeOnboarding, navigate]);

    const startCalibration = () => {
        setIsCalibrating(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="onboarding-card"
            style={{ maxWidth: '600px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            {!isCalibrating ? (
                <>
                    <h2 className="onboarding-title">Ritual of Sight</h2>
                    <p className="onboarding-desc">
                        Follow the magical dot with your eyes.<br />
                        Keep your head still!
                    </p>
                    <button className="btn-primary" onClick={startCalibration}>
                        Begin Ritual
                    </button>
                </>
            ) : (
                <div className="flex-center flex-col h-full relative">
                    {step < 5 ? (
                        <motion.div
                            key={step}
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="cal-dot-active"
                            style={{
                                width: '30px', height: '30px', borderRadius: '50%',
                                background: 'var(--c-accent)',
                                boxShadow: '0 0 20px var(--c-accent)',
                                position: 'absolute',
                                // Mock positions
                                top: step === 0 ? '10%' : step === 1 ? '10%' : step === 2 ? '80%' : step === 3 ? '80%' : '50%',
                                left: step === 0 ? '10%' : step === 1 ? '90%' : step === 2 ? '10%' : step === 3 ? '90%' : '50%'
                            }}
                        />
                    ) : (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex-center flex-col"
                        >
                            <Eye size={64} color="var(--c-primary)" />
                            <h2 className="onboarding-title mt-4">Excellent!</h2>
                            <p>Calibration Complete.</p>
                        </motion.div>
                    )}

                    <div className="absolute bottom-0 w-full">
                        <p className="text-gray-400 text-sm">Calibrating point {Math.min(step + 1, 5)} / 5</p>
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
                {/* Simple logo header */}
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
