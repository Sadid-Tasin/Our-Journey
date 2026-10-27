import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaStar, FaPaperPlane, FaMagic } from 'react-icons/fa';
import { wishes as initialWishes } from '../data/content';

interface WishesPageProps {
    onBack: () => void;
}

const WishesPage: React.FC<WishesPageProps> = ({ onBack }) => {
    const [wishes, setWishes] = useState(initialWishes);
    const [newWish, setNewWish] = useState('');
    const [isWishing, setIsWishing] = useState(false);
    const [backgroundStars, setBackgroundStars] = useState<{ id: number; left: string; top: string; size: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const stars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2
        }));
        setBackgroundStars(stars);
    }, []);

    const handleAddWish = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWish.trim()) return;

        setIsWishing(true);

        // Simulate sending wish to the stars
        setTimeout(() => {
            const wishObj = {
                id: Date.now(),
                wish: newWish,
                emoji: "✨" // Generic sparkle for user wishes
            };
            setWishes([wishObj, ...wishes]);
            setNewWish('');
            setIsWishing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white selection:bg-purple-500/30">
            {/* Starry Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {backgroundStars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: star.size,
                            height: star.size,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Glowing Orbs/Nebula Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 px-4 py-8 md:py-12 max-w-6xl mx-auto flex flex-col min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={onBack}
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                    >
                        <FaArrowLeft />
                        <span className="font-medium">Return to Earth</span>
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center md:text-right"
                    >
                        <h1 className="text-4xl md:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-100 drop-shadow-lg mb-2">
                            A Sky Full of Wishes
                        </h1>
                        <p className="font-handwriting text-xl text-purple-300">
                            Every star is a dream of us...
                        </p>
                    </motion.div>
                </div>

                {/* Main Content Area: Wishes Grid & Input */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow">

                    {/* Make a Wish Section (Sticky on Desktop) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6 text-amber-300">
                                    <FaMagic className="text-2xl" />
                                    <h2 className="text-2xl font-display font-bold">Make a Wish</h2>
                                </div>
                                <p className="text-purple-200 mb-6 font-light leading-relaxed">
                                    Cast a wish into our universe. Let's make it real together.
                                </p>

                                <form onSubmit={handleAddWish} className="space-y-4">
                                    <div className="relative group">
                                        <textarea
                                            value={newWish}
                                            onChange={(e) => setNewWish(e.target.value)}
                                            placeholder="I wish for..."
                                            className="w-full bg-black/20 text-white placeholder-purple-300/50 border border-purple-500/30 rounded-xl p-4 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all resize-none h-32"
                                            disabled={isWishing}
                                        />
                                        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/10 pointer-events-none transition-colors" />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={!newWish.trim() || isWishing}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!newWish.trim() || isWishing
                                                ? 'bg-gray-600/50 cursor-not-allowed text-gray-400'
                                                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/30'
                                            }`}
                                    >
                                        {isWishing ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                <FaStar />
                                            </motion.div>
                                        ) : (
                                            <>
                                                <span>Send to Stars</span>
                                                <FaPaperPlane className="text-sm" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                    {/* Wishes Display (Masonry feel) */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {wishes.map((wish, index) => (
                                    <motion.div
                                        key={wish.id}
                                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index < 6 ? index * 0.1 : 0,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{ y: -8, scale: 1.02, zIndex: 10 }}
                                        className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 ${(index % 3 === 0 && index !== 0) ? 'md:col-span-2 bg-gradient-to-r from-purple-900/40 to-blue-900/40' : ''
                                            }`}
                                    >
                                        <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                            <FaStar className="text-amber-300 text-xs" />
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="text-3xl bg-white/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                {wish.emoji}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg text-purple-50 font-light leading-relaxed group-hover:text-white transition-colors">
                                                    {wish.wish}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Decor elements */}
                                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-br-2xl pointer-events-none" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishesPage;
