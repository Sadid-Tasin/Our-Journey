import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCamera, FaGift, FaStar, FaCloud, FaChevronRight, FaArrowRight, FaCrown, FaFeather, FaMusic } from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';

interface MainPageProps {
    onNavigate: (page: string) => void;
}

const cards = [
    {
        id: 'messages',
        title: 'Messages from My Heart',
        subtitle: 'Whispers of my love, just for you',
        icon: FaHeart,
        color: 'text-rose-500',
        bg: 'bg-rose-50',
        border: 'border-rose-100',
        shadow: 'shadow-rose-100',
        delay: 0.1,
        emoji: '💌'
    },
    {
        id: 'gallery',
        title: 'Our Gallery of Memories',
        subtitle: 'Every picture tells our love story',
        icon: FaCamera,
        color: 'text-sky-500',
        bg: 'bg-sky-50',
        border: 'border-sky-100',
        shadow: 'shadow-sky-100',
        delay: 0.2,
        emoji: '📸'
    },
    {
        id: 'blindbox',
        title: 'Surprise Blind Boxes',
        subtitle: 'Little gifts wrapped in my heart',
        icon: FaGift,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        shadow: 'shadow-amber-100',
        delay: 0.3,
        emoji: '🎁'
    },
    {
        id: 'wishes',
        title: 'My Sweetest Wishes',
        subtitle: 'Dreams I hope we share together',
        icon: FaStar,
        color: 'text-purple-500',
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        shadow: 'shadow-purple-100',
        delay: 0.4,
        emoji: '⭐'
    },
];

const MainPage: React.FC<MainPageProps> = ({ onNavigate }) => {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 text-slate-800">
            {/* Background Decorations */}
            <FloatingHearts count={15} />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />

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
                            <h2 className="text-2xl md:text-3xl font-serif text-rose-400 mb-4 tracking-widest uppercase">Chapter 2</h2>
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8" />
                            <h1 className="text-5xl md:text-7xl font-display text-rose-900 drop-shadow-sm">
                                A Romantic Heaven
                            </h1>
                            <p className="mt-6 text-lg text-slate-500 font-light italic">Where our journey continues...</p>
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="relative z-10 px-4 py-12 md:py-20 max-w-6xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-center mb-16"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="inline-block mb-6 relative"
                            >
                                <FaCloud className="text-6xl text-rose-200 relative z-10 drop-shadow-md" />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rose-500 text-2xl z-20">
                                    <FaHeart />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="mb-6"
                            >
                                <FaCrown className="text-6xl text-rose-300 mx-auto drop-shadow-lg" />
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-display mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-purple-600 drop-shadow-sm">
                                My Heart's Menu
                            </h1>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <FaFeather className="text-rose-300" />
                                </motion.div>
                                <p className="text-xl md:text-2xl font-handwriting text-rose-500">
                                    Choose a path to explore my love
                                </p>
                                <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                                    <FaFeather className="text-rose-300" />
                                </motion.div>
                            </div>
                            <div className="flex justify-center gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                        className="text-rose-200 text-lg"
                                    >
                                        💕
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Cloud Grid */}
                        {/* Floating Decorative Elements */}
                        <div className="absolute top-1/4 left-4 text-4xl opacity-20 animate-bounce">💖</div>
                        <div className="absolute top-1/3 right-8 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
                        <div className="absolute bottom-1/4 left-12 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>💫</div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 relative z-10">
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: card.delay, duration: 0.8, ease: "easeOut" }}
                                    whileHover={{ scale: 1.03, y: -8 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onNavigate(card.id)}
                                    className={`group cursor-pointer relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 p-8 overflow-hidden hover:shadow-2xl transition-all duration-500 ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}
                                >
                                    {/* Animated Background Pattern */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${card.bg.replace('50', '100')} opacity-10`}></div>
                                    </div>

                                    {/* Floating Emoji */}
                                    <motion.div
                                        className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-300"
                                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                    >
                                        {card.emoji}
                                    </motion.div>

                                    <div className="relative z-10 flex items-center gap-6">
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl ${card.bg} flex items-center justify-center border ${card.border} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                            whileHover={{ scale: 1.15, rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <card.icon className={`text-3xl ${card.color} group-hover:scale-110 transition-transform duration-300`} />
                                        </motion.div>

                                        <div className="flex-1 text-left">
                                            <h3 className="text-2xl font-display text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-pink-500 transition-all duration-300">
                                                {card.title}
                                            </h3>
                                            <p className="text-slate-500 font-light text-sm tracking-wide group-hover:text-slate-600 transition-colors">
                                                {card.subtitle}
                                            </p>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            whileHover={{ opacity: 1, x: 0 }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full ${card.bg} shadow-md border ${card.border} backdrop-blur-sm`}
                                        >
                                            <span className={`text-xs font-display font-bold uppercase tracking-widest ${card.color}`}>Explore</span>
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <FaChevronRight className={`text-xs ${card.color}`} />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Soft Glow Effect */}
                                    <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${card.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`}></div>
                                    <div className={`absolute -left-8 -top-8 w-24 h-24 ${card.bg} rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Final Destination */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mt-20 text-center relative"
                        >
                            {/* Decorative Music Notes */}
                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <FaMusic className="text-rose-200 text-xl" />
                                </motion.div>
                                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
                                    <FaMusic className="text-pink-200 text-xl" />
                                </motion.div>
                                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>
                                    <FaMusic className="text-purple-200 text-xl" />
                                </motion.div>
                            </div>

                            <motion.button
                                onClick={() => onNavigate('finalboss')}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-12 py-6 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full overflow-hidden shadow-2xl hover:shadow-rose-300/50 transition-all duration-500 transform"
                            >
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Sparkle Effects */}
                                <div className="absolute inset-0">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                            }}
                                            animate={{
                                                scale: [0, 1, 0],
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10 flex items-center gap-4">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    >
                                        <FaCrown className="text-xl" />
                                    </motion.div>
                                    <span className="font-display tracking-widest text-xl font-bold">THE FINAL Chapter</span>
                                    <motion.div
                                        animate={{ x: [0, 8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <FaArrowRight className="text-xl" />
                                    </motion.div>
                                </div>
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8 }}
                                className="mt-6 text-rose-400 font-handwriting text-lg"
                            >
                                The grand finale of our love story awaits...
                            </motion.p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MainPage;

