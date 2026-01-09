import React, { useState, useEffect } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';

interface IrisCharacterProps {
    width?: number | string;
    height?: number | string;
    state?: 'IDLE' | 'HAPPY' | 'WORRIED' | 'LISTENING';
}

const IrisCharacter: React.FC<IrisCharacterProps> = ({ width = 150, height = 150, state = 'IDLE' }) => {
    const [riveLoaded, setRiveLoaded] = useState(false);
    const [useFallback, setUseFallback] = useState(false);

    // Rive Init
    const { rive, RiveComponent } = useRive({
        src: 'iris.riv', // Expects file in public/iris.riv
        stateMachines: 'State Machine 1',
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
        }),
        autoplay: true,
        onLoad: () => {
            setRiveLoaded(true);
        }
    });

    // Inputs
    const stateInput = useStateMachineInput(rive, 'State Machine 1', 'StateNum');

    // Sync React State to Rive
    useEffect(() => {
        if (rive && stateInput) {
            // Map string state to number for Rive State Machine
            // 0: Idle, 1: Happy, 2: Worried, 3: Listening
            const map = { 'IDLE': 0, 'HAPPY': 1, 'WORRIED': 2, 'LISTENING': 3 };
            stateInput.value = map[state] || 0;
        }
    }, [state, rive, stateInput]);

    // Fallback Timer: If Rive doesn't load in 1.5s, show Image Fallback
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!riveLoaded) {
                setUseFallback(true);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [riveLoaded]);

    // Fallback View (CSS Animation with Image)
    if (useFallback) {
        return (
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width, height,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative'
                }}
            >
                {/* Glow Effect */}
                <div style={{ position: 'absolute', inset: 10, background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', borderRadius: '50%' }} />

                <img
                    src="/iris_fallback.jpg"
                    alt="Iris"
                    style={{
                        width: '100%', height: '100%', objectFit: 'contain',
                        borderRadius: '50%',
                        border: '4px solid white',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                    }}
                />
            </motion.div>
        );
    }

    return (
        <div style={{ width, height, opacity: riveLoaded ? 1 : 0, transition: 'opacity 0.5s' }}>
            <RiveComponent />
        </div>
    );
};

export default IrisCharacter;
