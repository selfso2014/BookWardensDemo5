
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGameStore } from '../lib/store';
import { setGazeCallback } from '../lib/seesoHandler';
import { MOCK_BOOKS } from '../data/mockBooks';
import '../styles/Layout.css';

type RunPhase = 'WORD' | 'READ' | 'RIFT' | 'BOSS' | 'REWARD';

const RunSessionPage: React.FC = () => {
    const navigate = useNavigate();
    const { addInk, addRunes, addGems, selectedBookId, selectedChapterId } = useGameStore();

    // Find content
    const book = MOCK_BOOKS.find(b => b.id === (selectedBookId || 'book_01'));
    const chapter = book?.chapters.find(c => c.id === (selectedChapterId || 'ch_01'));

    const [phase, setPhase] = useState<RunPhase>('WORD');
    const [timer, setTimer] = useState(600); // 10 mins in seconds
    const [gazePos, setGazePos] = useState<{ x: number, y: number } | null>(null);
    const [readPage, setReadPage] = useState(0); // Pagination state

    // Initial check
    if (!book || !chapter) {
        return <div className="p-4">Error loading content. <button onClick={() => navigate('/home')}>Back</button></div>;
    }

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
        return `${m}:${sec < 10 ? '0' : ''}${sec} `;
    };

    // Phase Transitions
    const nextPhase = () => {
        if (phase === 'WORD') setPhase('READ');
        else if (phase === 'READ') setPhase('RIFT');
        else if (phase === 'RIFT') setPhase('BOSS');
        else if (phase === 'BOSS') {
            // Give Rewards based on chapter data
            addInk(chapter.rewards.ink);
            addRunes(chapter.rewards.runes);
            addGems(chapter.rewards.gems);
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
        const q = chapter.wordSprint;

        const handleWordChoice = (choice: string) => {
            if (choice === q.correctChoice) {
                nextPhase();
            } else {
                setShake(choice);
                setTimeout(() => setShake(null), 500);
            }
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', textAlign: 'center', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--c-primary)' }}>Word Sprint!</h2>
                <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem', marginBottom: '2rem' }}>
                    <p style={{ color: 'var(--c-text-sub)', marginBottom: '0.5rem' }}>Identify this word:</p>
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>{q.word}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {q.choices.map((choice) => (
                            <motion.button
                                key={choice}
                                className="btn-secondary"
                                onClick={() => handleWordChoice(choice)}
                                animate={shake === choice ? { x: [-10, 10, -10, 10, 0], backgroundColor: '#FEE2E2', borderColor: '#F87171' } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                {choice}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <p style={{ color: 'var(--c-text-sub)', fontSize: '0.85rem' }}>Phase 1/5</p>
            </div>
        );
    };

    const ReadPhase = () => {
        const paragraphs = chapter.content;
        const totalPages = paragraphs.length;
        const currentText = paragraphs[readPage] || "";

        const handlePrev = () => {
            if (readPage > 0) setReadPage(p => p - 1);
        };

        const handleNext = () => {
            if (readPage < totalPages - 1) {
                setReadPage(p => p + 1);
            } else {
                nextPhase(); // Finish Reading
            }
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                {gazePos && (
                    <div
                        style={{
                            position: 'fixed', left: gazePos.x, top: gazePos.y,
                            width: 20, height: 20, borderRadius: '50%',
                            backgroundColor: 'rgba(139, 92, 246, 0.4)',
                            pointerEvents: 'none', zIndex: 9999,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 15px rgba(139, 92, 246, 0.6)'
                        }}
                    />
                )}

                <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%' }}>
                    <Eye size={20} color="var(--c-primary)" />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem', overflow: 'hidden' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--c-text-sub)', textAlign: 'center', flexShrink: 0 }}>
                        {book.title} <span style={{ fontWeight: 400 }}>- {readPage + 1}/{totalPages}</span>
                    </h2>

                    {/* Book Page Container */}
                    <div className="card" style={{
                        flex: 1,
                        width: '100%',
                        maxWidth: '700px', // Prevent too wide text on PC
                        margin: '0 auto', // Center on PC
                        padding: '1.5rem',
                        backgroundColor: '#fffdf5',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        lineHeight: 1.8,
                        fontFamily: 'serif',
                        fontSize: '1.25rem',
                        color: '#374151',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <motion.div
                            key={readPage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{ width: '100%' }}
                        >
                            <p dangerouslySetInnerHTML={{ __html: currentText }} />
                        </motion.div>
                    </div>
                </div>

                {/* Pagination Controls - Fixed Bottom */}
                <div style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    backgroundColor: 'var(--c-bg)',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    flexShrink: 0
                }}>
                    <button
                        className="btn-secondary"
                        onClick={handlePrev}
                        disabled={readPage === 0}
                        style={{ opacity: readPage === 0 ? 0.5 : 1, minWidth: '100px' }}
                    >
                        <ChevronLeft size={20} style={{ marginRight: '0.25rem' }} /> Prev
                    </button>

                    <div style={{ fontSize: '0.9rem', color: 'var(--c-text-sub)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {readPage + 1} / {totalPages}
                    </div>

                    <button
                        className="btn-primary"
                        onClick={handleNext}
                        style={{ minWidth: '100px' }}
                    >
                        {readPage === totalPages - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} style={{ marginLeft: '0.25rem' }} />
                    </button>
                </div>
            </div>
        );
    };

    const RiftPhase = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--c-secondary)' }}>Rift Alert!</h2>
            <p style={{ marginBottom: '2rem' }}>Tap the corrupted text to cleanse it!</p>
            <div className="card" onClick={nextPhase}
                style={{ padding: '2rem', backgroundColor: '#1F2937', color: 'white', cursor: 'pointer', position: 'relative', overflow: 'hidden', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <p style={{ filter: 'blur(4px)', userSelect: 'none' }}>
                    {chapter.riftPoints[0].text}
                </p>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>👻</span>
                </div>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', animation: 'bounce 1s infinite' }}>Tap to Cleanse!</p>
        </div>
    );

    const BossPhase = () => {
        const boss = chapter.boss;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--c-error)' }}>Boss Battle!</h2>
                <p style={{ marginBottom: '2rem' }}>{boss.name}</p>

                <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', marginBottom: '2rem', border: '4px solid #FCA5A5' }}>
                    {boss.avatarEmoji}
                </div>

                <div className="card" style={{ width: '100%', padding: '1.5rem', marginBottom: '1rem', maxWidth: '400px' }}>
                    <p style={{ fontWeight: 700, marginBottom: '1rem' }}>Quiz: "{boss.quizQuestion}"</p>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {boss.quizChoices.map(c => (
                            <button
                                key={c}
                                className="btn-secondary"
                                style={{ width: '100%' }}
                                onClick={() => {
                                    if (c === boss.correctAnswer) nextPhase();
                                    else alert("Wrong! " + boss.avatarEmoji + " attacks!");
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

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
                    <span>+{chapter.rewards.ink} Ink</span>
                </div>
                <div className="flex-center" style={{ flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.5rem' }}>✨</span>
                    <span>+{chapter.rewards.runes} Rune</span>
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
                        key={phase + selectedChapterId} // Force re-render on chapter change
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
