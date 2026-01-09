import React from 'react';
import { motion } from 'framer-motion';
import irisFallbackSrc from '../assets/iris_fallback.jpg'; // Import asset

interface IrisCharacterProps {
    width?: number | string;
    height?: number | string;
    state?: 'IDLE' | 'HAPPY' | 'WORRIED' | 'LISTENING';
}

const IrisCharacter: React.FC<IrisCharacterProps> = ({ width = 150, height = 150, state: _state = 'IDLE' }) => {
    // Rive integration is currently removed to fix build errors.
    // The iris.riv file is missing from public folder.
    // Once the file is added, revert to the Rive implementation.

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
                src={irisFallbackSrc}
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
};

export default IrisCharacter;
