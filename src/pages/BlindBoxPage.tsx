import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaLock, FaQuestion } from 'react-icons/fa';
import { blindBoxes } from '../data/blindboxes';
import FloatingHearts from '../components/FloatingHearts';
import emailjs from '@emailjs/browser';

interface BlindBoxPageProps {
    onBack: () => void;
}

const BlindBoxPage: React.FC<BlindBoxPageProps> = ({ onBack }) => {
    const [revealed, setRevealed] = useState<number[]>([]);
    const [emailSent, setEmailSent] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);

    const maxPicks = 2;
    const allPicked = revealed.length >= maxPicks;

    const handleBoxClick = async (id: number) => {
        // Already revealed or already picked max
        if (revealed.includes(id) || allPicked) return;

        const newRevealed = [...revealed, id];
        setRevealed(newRevealed);

        // If this was the 2nd pick, send email automatically
        if (newRevealed.length === maxPicks) {
            setSendingEmail(true);
            try {
                const selectedBoxNames = newRevealed
                    .map((boxId) => blindBoxes.find((b) => b.id === boxId)?.name)
                    .join(', ');

                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo',
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_TO_ME || 'demo',
                    {
                        message: `Your love chose these blind boxes: ${selectedBoxNames}`,
                        boxes: selectedBoxNames,
                    },
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo'
                ).catch(() => console.log('EmailJS not configured yet'));
            } catch (error) {
                console.log('EmailJS not configured — skipping email send');
            }
            setSendingEmail(false);
            setEmailSent(true);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
            <FloatingHearts count={8} />

            {/* Ambient glow orbs */}
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 px-4 py-8 md:py-16 max-w-4xl mx-auto">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-8 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to menu</span>
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-14"
                >
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-6xl mb-5"
                    >
                        🎁
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 mb-3">
                        Mystery Blind Boxes
                    </h1>
                    <p className="font-handwriting text-xl text-purple-300 mb-2">
                        Tap a box to reveal what's inside... choose wisely!
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${revealed.length >= 1 ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-white/20'} transition-all duration-500`} />
                        <div className={`w-3 h-3 rounded-full ${revealed.length >= 2 ? 'bg-amber-400 shadow-lg shadow-amber-400/50' : 'bg-white/20'} transition-all duration-500`} />
                        <span className="text-purple-300/60 text-sm ml-2">{revealed.length}/{maxPicks} revealed</span>
                    </div>
                </motion.div>

                {/* Blind Boxes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {blindBoxes.map((box, index) => {
                        const isRevealed = revealed.includes(box.id);
                        const isLocked = allPicked && !isRevealed;

                        return (
                            <motion.div
                                key={box.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                onClick={() => handleBoxClick(box.id)}
                                className={`relative cursor-pointer ${isLocked ? 'pointer-events-none' : ''}`}
                                style={{ perspective: '800px' }}
                            >
                                <AnimatePresence mode="wait">
                                    {!isRevealed ? (
                                        /* ─── MYSTERY STATE ─── */
                                        <motion.div
                                            key="mystery"
                                            initial={{ rotateY: 0 }}
                                            exit={{ rotateY: 90, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            whileHover={!isLocked ? { y: -8, scale: 1.04 } : {}}
                                            whileTap={!isLocked ? { scale: 0.96 } : {}}
                                            className={`relative rounded-3xl shadow-2xl p-8 text-center overflow-hidden min-h-[220px] flex flex-col items-center justify-center
                                                ${isLocked
                                                    ? 'bg-slate-800/60 border border-slate-700/50'
                                                    : 'bg-gradient-to-br from-slate-800 via-purple-900/50 to-slate-800 border border-purple-500/20 hover:border-purple-400/40'
                                                }
                                                transition-all duration-500`}
                                        >
                                            {/* Shimmer effect */}
                                            {!isLocked && (
                                                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                                                        animate={{ x: ['-200%', '200%'] }}
                                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                                    />
                                                </div>
                                            )}

                                            {/* Locked overlay */}
                                            {isLocked && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute inset-0 bg-black/30 rounded-3xl flex items-center justify-center backdrop-blur-sm z-20"
                                                >
                                                    <div className="text-center">
                                                        <FaLock className="text-white/40 text-3xl mx-auto mb-2" />
                                                        <p className="text-white/40 text-sm font-medium">Sealed</p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Mystery icon */}
                                            <motion.div
                                                animate={!isLocked ? {
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, 3, -3, 0],
                                                } : {}}
                                                transition={{ duration: 4, repeat: Infinity }}
                                                className="relative z-10"
                                            >
                                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-amber-500/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner mb-4 mx-auto">
                                                    <FaQuestion className="text-amber-300/80 text-3xl" />
                                                </div>
                                            </motion.div>

                                            <h3 className="text-lg font-display text-purple-200/80 mb-1 relative z-10">
                                                {box.mysteryLabel}
                                            </h3>
                                            <p className="text-purple-300/40 text-sm font-light relative z-10">
                                                {isLocked ? 'Not chosen' : 'Tap to reveal'}
                                            </p>

                                            {/* Subtle sparkles */}
                                            {!isLocked && (
                                                <>
                                                    <motion.span
                                                        className="absolute top-4 right-4 text-amber-400/30 text-sm"
                                                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                                    >✦</motion.span>
                                                    <motion.span
                                                        className="absolute bottom-4 left-4 text-purple-400/30 text-sm"
                                                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                                    >✧</motion.span>
                                                </>
                                            )}
                                        </motion.div>
                                    ) : (
                                        /* ─── REVEALED STATE ─── */
                                        <motion.div
                                            key="revealed"
                                            initial={{ rotateY: -90, opacity: 0 }}
                                            animate={{ rotateY: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                                            className={`bg-gradient-to-br ${box.color} rounded-3xl shadow-2xl p-8 text-center text-white relative overflow-hidden min-h-[220px] flex flex-col items-center justify-center ring-4 ring-white/30 shadow-amber-300/20`}
                                        >
                                            {/* Celebration particles */}
                                            {[...Array(6)].map((_, i) => (
                                                <motion.span
                                                    key={i}
                                                    className="absolute text-xl pointer-events-none"
                                                    initial={{
                                                        x: 0, y: 0,
                                                        opacity: 1,
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        x: (Math.random() - 0.5) * 200,
                                                        y: (Math.random() - 0.5) * 200,
                                                        opacity: 0,
                                                        scale: 1,
                                                    }}
                                                    transition={{ duration: 1.2, delay: i * 0.08 }}
                                                    style={{ left: '50%', top: '50%' }}
                                                >
                                                    {['✨', '💫', '⭐', '🌟', '💖', '🎉'][i]}
                                                </motion.span>
                                            ))}

                                            <motion.span
                                                className="text-6xl block mb-4"
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                            >
                                                {box.emoji}
                                            </motion.span>

                                            <motion.h3
                                                className="text-2xl font-display font-bold mb-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                {box.name}
                                            </motion.h3>

                                            <motion.p
                                                className="text-white/80 text-sm font-light"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                {box.description}
                                            </motion.p>

                                            {/* Glow */}
                                            <div className="absolute inset-0 bg-white/10 rounded-3xl" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Sending email indicator */}
                <AnimatePresence>
                    {sendingEmail && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center mb-8"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-3 border-amber-300 border-t-transparent rounded-full mx-auto mb-3"
                            />
                            <p className="text-purple-200 font-handwriting text-lg">Sending your choices to the stars... ✨</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success Message */}
                <AnimatePresence>
                    {emailSent && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: 'spring', stiffness: 100 }}
                            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center max-w-md mx-auto"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl mb-4"
                            >
                                🎉
                            </motion.div>
                            <h3 className="text-2xl font-display text-amber-200 mb-3">Surprises Unlocked!</h3>
                            <p className="text-purple-200/70 font-light leading-relaxed">
                                Your choices have been sealed and sent! Get ready for your special surprises, my love 💕
                            </p>
                            <div className="mt-6 flex justify-center gap-3">
                                {revealed.map((id) => {
                                    const box = blindBoxes.find((b) => b.id === id);
                                    return (
                                        <motion.div
                                            key={id}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: id * 0.3 }}
                                            className="bg-white/10 rounded-xl px-4 py-2 border border-white/10"
                                        >
                                            <span className="text-xl mr-2">{box?.emoji}</span>
                                            <span className="text-amber-200 font-medium text-sm">{box?.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BlindBoxPage;
