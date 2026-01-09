import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Eye, X } from 'lucide-react';
import { useGameStore } from '../lib/store';
import { setGazeCallback } from '../lib/seesoHandler';
import '../styles/Layout.css';

type RunPhase = 'WORD' | 'READ' | 'RIFT' | 'BOSS' | 'REWARD';

const RunSessionPage: React.FC = () => {
    const navigate = useNavigate();
    const { addInk, addRunes, addGems } = useGameStore();
    const [phase, setPhase] = useState<RunPhase>('WORD');
    const [timer, setTimer] = useState(600); // 10 mins in seconds
    const [gazePos, setGazePos] = useState<{ x: number, y: number } | null>(null);

    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(t => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Gaze Listener
    useEffect(() => {
        setGazeCallback((data) => {
            setGazePos({ x: data.x, y: data.y });
        });
        return () => {
            setGazeCallback(() => { }); // cleanup
        };
    }, []);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    };

    // Phase Transitions
    const nextPhase = () => {
        if (phase === 'WORD') setPhase('READ');
        else if (phase === 'READ') setPhase('RIFT');
        else if (phase === 'RIFT') setPhase('BOSS');
        else if (phase === 'BOSS') {
            // Give Rewards
            addInk(100);
            addRunes(5);
            addGems(1);
            setPhase('REWARD');
        }
        else if (phase === 'REWARD') navigate('/home');
    };

    const quitRun = () => {
        if (window.confirm("Quit run? Progress will be lost.")) navigate('/home');
    };

    // --- Phase Components ---

    const WordPhase = () => {
        const [shake, setShake] = useState<string | null>(null);

        const handleWordChoice = (choice: string) => {
            if (choice === 'Short-lived') {
                // Correct
                nextPhase();
            } else {
                // Incorrect
                setShake(choice);
                setTimeout(() => setShake(null), 500);
            }
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', textAlign: 'center', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--c-primary)' }}>Word Sprint!</h2>
                <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem', marginBottom: '2rem' }}>
                    <p style={{ color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Identify this word:</p>
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ephemeral</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {['Short-lived', 'Eternal', 'Heavy', 'Bright'].map((word) => (
                            <motion.button
                                key={word}
                                className="btn-secondary"
                                onClick={() => handleWordChoice(word)}
                                animate={shake === word ? { x: [-10, 10, -10, 10, 0], backgroundColor: '#FEE2E2', borderColor: '#F87171' } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                {word}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <p style={{ color: 'var(--c-text-sub)', fontSize: '0.85rem' }}>Step 1/5</p>
            </div>
        );
    };

    const ReadPhase = () => (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            {/* Gaze Dot Feedback (Only visible in Read Phase) */}
            {gazePos && (
                <div
                    style={{
                        position: 'fixed',
                        left: gazePos.x,
                        top: gazePos.y,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(139, 92, 246, 0.5)', // Transparent Purple
                        pointerEvents: 'none',
                        zIndex: 9999,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
                    }}
                />
            )}

            <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%' }}>
                <Eye size={20} color="var(--c-primary)" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Chapter 1: The Beginning</h2>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', lineHeight: 2, fontFamily: 'serif', fontSize: '1.1rem' }}>
                <p>
                    The library was quiet, save for the gentle rustling of pages.
                    <span style={{ backgroundColor: '#E9D5FF', padding: '0 4px', borderRadius: '4px' }}>Iris floated silently</span> near the ceiling,
                    her wings shimmering with a soft, iridescent light. It was a day unlike any other in Libraria...
                </p>
                <p>
                    As the clock struck noon, a strange ripple distorted the air. Books began to tremble on their shelves.
                    One by one, letters peeled off the pages, swirling into a chaotic vortex.
                    "The Rift!" Iris cried out, her small voice trembling with urgency.
                </p>
                <div style={{ height: '150px' }} /> {/* Spacer */}
            </div>
            <div className="flex-center" style={{ marginTop: '1rem' }}>
                <button className="btn-primary" onClick={nextPhase}>Finish Reading</button>
            </div>
        </div>
    );

    const RiftPhase = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--c-secondary)' }}>Rift Alert!</h2>
            <p style={{ marginBottom: '2rem' }}>Tap the corrupted text to cleanse it!</p>
            <div className="card" onClick={nextPhase}
                style={{ padding: '2rem', backgroundColor: '#1F2937', color: 'white', cursor: 'pointer', position: 'relative', overflow: 'hidden', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <p style={{ filter: 'blur(4px)', userSelect: 'none' }}>Corruption...</p>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>👻</span>
                </div>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', animation: 'bounce 1s infinite' }}>Tap to Cleanse!</p>
        </div>
    );

    const BossPhase = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--c-error)' }}>Boss Battle!</h2>
            <p style={{ marginBottom: '2rem' }}>The Trickster of Typos</p>

            <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', marginBottom: '2rem', border: '4px solid #FCA5A5' }}>
                😈
            </div>

            <div className="card" style={{ width: '100%', padding: '1.5rem', marginBottom: '1rem', maxWidth: '400px' }}>
                <p style={{ fontWeight: 700, marginBottom: '1rem' }}>Quiz: "What was Iris doing?"</p>
                <button className="btn-primary" style={{ width: '100%' }} onClick={nextPhase}>Floating silently</button>
            </div>
        </div>
    );

    const RewardPhase = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ fontSize: '4rem', marginBottom: '1rem' }}
            >
                🎉
            </motion.div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--c-primary)' }}>Run Complete!</h2>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div className="flex-center" style={{ flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.5rem' }}>💧</span>
                    <span>+100 Ink</span>
                </div>
                <div className="flex-center" style={{ flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.5rem' }}>✨</span>
                    <span>+5 Rune</span>
                </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', maxWidth: '200px' }} onClick={nextPhase}>Back to Libraria</button>
        </div>
    );

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--c-bg)' }}>
            {/* HUD */}
            <header style={{ height: '60px', backgroundColor: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', color: 'var(--c-primary-dark)', fontWeight: 700 }}>
                    <Clock size={18} />
                    {formatTime(timer)}
                </div>
                <div style={{ flex: 1, margin: '0 1rem', height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                        style={{
                            height: '100%', backgroundColor: 'var(--c-primary)', transition: 'width 0.5s ease',
                            width: phase === 'WORD' ? '20%' : phase === 'READ' ? '40%' : phase === 'RIFT' ? '60%' : phase === 'BOSS' ? '80%' : '100%'
                        }}
                    />
                </div>
                <button onClick={quitRun} style={{ color: 'var(--c-text-sub)' }}>
                    <X size={24} />
                </button>
            </header>

            {/* Game Stage */}
            <main style={{ flex: 1, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{ height: '100%' }}
                    >
                        {phase === 'WORD' && <WordPhase />}
                        {phase === 'READ' && <ReadPhase />}
                        {phase === 'RIFT' && <RiftPhase />}
                        {phase === 'BOSS' && <BossPhase />}
                        {phase === 'REWARD' && <RewardPhase />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default RunSessionPage;
