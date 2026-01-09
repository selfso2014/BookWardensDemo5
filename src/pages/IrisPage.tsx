import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import IrisCharacter from '../components/IrisCharacter';
import { MessageCircle, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const IrisPage: React.FC = () => {
    const [irisState, setIrisState] = useState<'IDLE' | 'HAPPY' | 'WORRIED' | 'LISTENING'>('IDLE');
    const [message, setMessage] = useState("I'm always watching over you, Warden!");

    const handleInteract = () => {
        setIrisState('HAPPY');
        setMessage("You're doing great! Keep reading!");
        setTimeout(() => setIrisState('IDLE'), 2000);
    };

    return (
        <DashboardLayout>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '4rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

                    {/* Background Glow */}
                    <div style={{
                        position: 'absolute', width: '300px', height: '300px',
                        background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                        zIndex: 0
                    }} />

                    {/* Character */}
                    <div onClick={handleInteract} style={{ cursor: 'pointer', zIndex: 1 }}>
                        <IrisCharacter width={250} height={250} state={irisState} />
                    </div>

                    {/* Speech Bubble */}
                    <motion.div
                        key={message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card"
                        style={{
                            marginTop: '2rem', padding: '1.5rem',
                            textAlign: 'center', maxWidth: '80%',
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            border: '1px solid var(--c-primary-light)',
                            zIndex: 1
                        }}
                    >
                        <MessageCircle size={24} color="var(--c-primary)" style={{ flexShrink: 0 }} />
                        <p style={{ margin: 0, fontSize: '1rem', color: 'var(--c-text-main)' }}>
                            "{message}"
                        </p>
                    </motion.div>
                </div>

                {/* Status / Interactions */}
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', padding: '1rem' }}>
                        <Heart color="var(--c-secondary)" fill="var(--c-secondary)" />
                        <span style={{ fontWeight: 600 }}>Mood: Happy</span>
                    </div>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', padding: '1rem' }}>
                        <Zap color="var(--c-accent)" fill="var(--c-accent)" />
                        <span style={{ fontWeight: 600 }}>Energy: 100%</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default IrisPage;
