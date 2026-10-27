import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { kindCriticisms } from '../data/content';
import FloatingHearts from '../components/FloatingHearts';

interface FinalBossPageProps {
    onBack: () => void;
    onContinue: () => void;
}

const FinalBossPage: React.FC<FinalBossPageProps> = ({ onBack, onContinue }) => {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-love-50 via-rose-50 to-love-100">
            <FloatingHearts count={10} />

            <AnimatePresence mode="wait">
                {showIntro ? (
                    <motion.div
                        key="intro-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)" }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-center p-8"
                        >
                            <h2 className="text-2xl md:text-3xl font-serif text-rose-400 mb-4 tracking-widest uppercase">Chapter 3</h2>
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8" />
                            <h1 className="text-5xl md:text-7xl font-display text-rose-900 drop-shadow-sm">
                                The Final Boss
                            </h1>
                            <p className="mt-6 text-lg text-slate-500 font-light italic">Love's little challenges...</p>
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="relative z-10 px-4 py-8 md:py-16 max-w-3xl mx-auto">
                        {/* Back button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={onBack}
                            className="flex items-center gap-2 text-love-700 hover:text-rose-500 transition-colors mb-8 group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to menu</span>
                        </motion.button>

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-12"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-5xl mb-4"
                            >
                                🎯
                            </motion.div>
                            <h1 className="text-3xl md:text-5xl font-display text-love-900 mb-3">
                                The Final Boss
                            </h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="font-handwriting text-xl md:text-2xl text-rose-400"
                            >
                                Things I don't like... but still love about you 💕
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-love-600/50 text-sm mt-2"
                            >
                                (Don't worry — this comes from the deepest love)
                            </motion.p>
                        </motion.div>

                        {/* Criticisms List */}
                        <div className="space-y-5 mb-12">
                            {kindCriticisms.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }} // Adjusted delay since intro takes time
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-rose-100 p-6 md:p-8 flex items-start gap-5"
                                    >
                                        <motion.span
                                            className="text-3xl md:text-4xl flex-shrink-0"
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                        >
                                            {item.emoji}
                                        </motion.span>
                                        <p className="text-lg md:text-xl text-love-800 leading-relaxed font-light">
                                            {item.text}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Big Emotional Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + kindCriticisms.length * 0.2 }} // Adjusted delay
                            className="flex justify-center"
                        >
                            <motion.button
                                onClick={onContinue}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group"
                            >
                                <div className="px-10 md:px-14 py-5 md:py-6 bg-gradient-to-r from-rose-400 via-red-400 to-pink-500 text-white font-display text-xl md:text-2xl rounded-2xl shadow-2xl shadow-rose-300 hover:shadow-rose-400 transition-all duration-500">
                                    <motion.span
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="flex items-center gap-3"
                                    >
                                        <FaHeart className="text-white/90" />
                                        I Still Love You So Much
                                        <FaHeart className="text-white/90" />
                                    </motion.span>
                                </div>

                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
                            </motion.button>
                        </motion.div>

                        {/* Sweet note */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 + kindCriticisms.length * 0.2 }} // Adjusted delay
                            className="text-center text-love-500/50 text-sm mt-8 font-handwriting text-lg"
                        >
                            Even with all of this, you're still the most perfect person for me ❤️
                        </motion.p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FinalBossPage;
