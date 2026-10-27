import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FaHeart, FaInfinity, FaFingerprint, FaCheck, FaChevronDown } from 'react-icons/fa';
import { finalLetter } from '../data/content';

const FinalPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [isSealed, setIsSealed] = useState(false);
    const [signature, setSignature] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

    // Parallax background elements
    const yCloud1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yCloud2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const scaleSun = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
    const ySun = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Split letter into paragraphs
    const paragraphs = finalLetter.split('\n').filter(p => p.trim() !== '');

    const handleSealScale = () => {
        setIsSealed(true);
        // Generate particles
        const newParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
            color: ['#f43f5e', '#ec4899', '#d946ef', '#f59e0b'][Math.floor(Math.random() * 4)]
        }));
        setParticles(newParticles);

        setTimeout(() => setSignature(true), 1500);
    };

    return (
        <div ref={containerRef} className="min-h-[250vh] relative bg-gradient-to-b from-orange-100 via-rose-200 to-indigo-900 text-slate-800 overflow-hidden">

            {/* --- Animated Background Elements --- */}
            <motion.div
                style={{ y: ySun, scale: scaleSun }}
                className="fixed top-20 right-[10%] w-64 h-64 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full blur-2xl opacity-60 pointer-events-none"
            />
            <motion.div
                style={{ y: yCloud1 }}
                className="fixed top-40 left-[5%] w-96 h-32 bg-white/40 blur-3xl rounded-full pointer-events-none"
            />
            <motion.div
                style={{ y: yCloud2 }}
                className="fixed bottom-1/3 right-[5%] w-80 h-40 bg-rose-300/30 blur-3xl rounded-full pointer-events-none"
            />

            {/* --- Fixed Navigation/Header --- */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-overlay"
            >
                <div className="text-rose-900 font-display font-bold text-xl tracking-widest">CHAPTER END</div>
                <FaInfinity className="text-rose-900 text-2xl" />
            </motion.div>


            {/* --- Content Sections --- */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center text-center stick">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-display text-rose-900 mb-6 drop-shadow-sm">
                            Forever<br />Starts Here
                        </h1>
                        <p className="text-2xl md:text-3xl font-handwriting text-rose-700 italic max-w-2xl mx-auto">
                            "Every ending is just a new beginning with you..."
                        </p>
                    </motion.div>

                    {/* Scroll Down Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                        className="mt-16 flex flex-col items-center justify-center gap-2"
                    >
                        <div className="w-6 h-10 border-2 border-rose-400 rounded-full flex justify-center p-1">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                                className="w-1.5 h-1.5 bg-rose-400 rounded-full"
                            />
                        </div>
                        <FaChevronDown className="text-rose-400 text-sm opacity-70" />
                    </motion.div>
                </section>

                {/* Letter Sections */}
                <div className="space-y-48">
                    {paragraphs.map((para, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ margin: "-20% 0px -20% 0px" }}
                            transition={{ duration: 1 }}
                            className={`p-8 md:p-12 rounded-3xl backdrop-blur-sm border border-white/20 shadow-xl
                                ${index % 2 === 0 ? 'bg-white/40 ml-auto rotate-1' : 'bg-rose-100/40 mr-auto -rotate-1'}
                                max-w-2xl text-lg md:text-2xl font-serif leading-relaxed text-rose-950`}
                        >
                            {para}
                        </motion.div>
                    ))}
                </div>

                {/* Interactive Finale */}
                <section className="h-screen flex flex-col items-center justify-center text-center mt-32">
                    <AnimatePresence>
                        {!isSealed ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-rose-200 max-w-md w-full"
                            >
                                <h2 className="text-4xl font-display text-rose-600 mb-8">One Last Promise</h2>
                                <p className="text-slate-600 mb-10 leading-relaxed">
                                    By clicking this, you promise to let me love you, cherish you, and annoy you for the rest of our lives.
                                </p>
                                <motion.button
                                    onClick={handleSealScale}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-5 bg-rose-500 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg shadow-rose-300/50 group"
                                >
                                    <FaFingerprint className="text-2xl group-hover:scale-110 transition-transform" />
                                    <span>Seal Our Promise</span>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative bg-white/90 backdrop-blur-2xl p-16 rounded-full shadow-[0_0_100px_rgba(244,63,94,0.3)] aspect-square flex flex-col items-center justify-center text-center border-4 border-rose-100"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-8xl mb-6 text-rose-500"
                                >
                                    <FaCheck />
                                </motion.div>
                                <motion.h2
                                    className="text-5xl font-display text-rose-800 mb-4"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    Promise Sealed
                                </motion.h2>
                                {signature && (
                                    <motion.div
                                        initial={{ opacity: 0, pathLength: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        className="font-handwriting text-3xl text-rose-500 mt-4"
                                    >
                                        Forever Yours ❤️
                                    </motion.div>
                                )}
                                <p className="absolute bottom-10 text-sm text-rose-400 uppercase tracking-widest font-bold">
                                    Established 2026
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>

            {/* Particle Effects (Simple Confetti) */}
            {isSealed && particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: window.innerWidth / 2, y: window.innerHeight / 2 + window.scrollY, scale: 0 }}
                    animate={{
                        x: p.x,
                        y: p.y + window.scrollY,
                        scale: Math.random(),
                        opacity: [1, 0]
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-3 h-3 rounded-full pointer-events-none z-50"
                    style={{ backgroundColor: p.color }}
                />
            ))}
        </div>
    );
};

export default FinalPage;
