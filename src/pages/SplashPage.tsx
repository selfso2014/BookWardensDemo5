import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../lib/store';
import { Sparkles, BookOpen } from 'lucide-react';
import '../styles/SplashPage.css';

const SplashPage: React.FC = () => {
    const navigate = useNavigate();
    const { isOnboarded } = useGameStore();

    useEffect(() => {
        // Artificial loading time
        const timer = setTimeout(() => {
            if (isOnboarded) {
                navigate('/home');
            } else {
                navigate('/onboarding/role'); // Start onboarding
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [isOnboarded, navigate]);

    return (
        <div className="splash-container">
            {/* Background Elements */}
            <div className="splash-bg-blob blob-1 animate-float" />
            <div className="splash-bg-blob blob-2 animate-float" style={{ animationDelay: '1s' }} />

            {/* Main Content */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="splash-content"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="logo-container"
                >
                    <BookOpen size={64} color="var(--c-primary)" />
                    <div className="sparkle-icon">
                        <Sparkles size={32} />
                    </div>
                </motion.div>

                <h1 className="splash-title">
                    The Book Wardens
                </h1>
                <p className="splash-subtitle">
                    Rift of Pages
                </p>

                <div className="loading-container">
                    <div className="loading-bar">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.5 }}
                            className="loading-fill"
                        />
                    </div>
                    <span className="loading-text">Loading Libraria...</span>
                </div>
            </motion.div>
        </div>
    );
};

export default SplashPage;
