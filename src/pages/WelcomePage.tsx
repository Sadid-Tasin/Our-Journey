import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaArrowRight, FaFeatherAlt } from 'react-icons/fa';
import { loveLetterContent } from '../data/content';
import FloatingHearts from '../components/FloatingHearts';

interface WelcomePageProps {
    onContinue: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onContinue }) => {
    const [showContent, setShowContent] = useState(false);
    const [isTurning, setIsTurning] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        setIsTurning(true);
        setTimeout(onContinue, 600); // Wait for animation half-way
    };

    const bookVariants = {
        hidden: { opacity: 0, scale: 0.9, rotateX: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        },
        turning: {
            rotateY: -90,
            transition: { duration: 0.6, ease: "easeIn" }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-love-50 via-rose-50 to-love-100 p-4 perspective-1000">
            <FloatingHearts count={18} />

            <AnimatePresence>
                <motion.div
                    key="storybook"
                    variants={bookVariants}
                    initial="hidden"
                    animate={isTurning ? "turning" : "visible"}
                    className="relative z-10 w-full max-w-5xl perspective-1000"
                >
                    {/* Book Spine/Cover Effect */}
                    <div className="absolute inset-2 top-0 bottom-4 bg-rose-900 rounded-r-lg shadow-2xl transform translate-x-2 translate-y-2 z-0"></div>

                    <div className="relative flex flex-col md:flex-row bg-[#fdfbf7] rounded-lg shadow-2xl overflow-hidden min-h-[650px] border-r-8 border-b-8 border-rose-900/20">

                        {/* Left Page (Visuals/Preface) */}
                        <div className="w-full md:w-5/12 p-8 md:p-12 border-b md:border-b-0 md:border-r border-stone-200 relative bg-[#fdfcf8]">
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#af8f8f 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                            <div className="h-full flex flex-col justify-center items-center text-center relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border-2 border-rose-200"
                                >
                                    <FaFeatherAlt className="text-rose-400 text-3xl" />
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-4xl md:text-5xl font-display text-rose-900 mb-4"
                                >
                                    Preface
                                </motion.h1>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "60px" }}
                                    transition={{ delay: 0.9, duration: 0.8 }}
                                    className="h-1 bg-rose-300 mb-6"
                                />

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="font-serif italic text-stone-600 text-lg leading-relaxed max-w-xs"
                                >
                                    "Before we begin our journey together, there is something I must tell you..."
                                </motion.p>

                                <div className="mt-auto opacity-50">
                                    <FaHeart className="text-rose-200 text-xl mx-auto" />
                                </div>
                            </div>
                        </div>

                        {/* Center Spine Shadow */}
                        <div className="hidden md:block absolute left-[41.66%] top-0 bottom-0 w-16 bg-gradient-to-r from-stone-400/20 via-transparent to-stone-400/20 -translate-x-1/2 pointer-events-none z-20"></div>

                        {/* Right Page (The Letter) */}
                        <div className="w-full md:w-7/12 p-8 md:p-14 bg-[#fffcf5] relative flex flex-col">
                            {/* Page Texture */}
                            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

                            <div className="relative z-10 flex-grow flex flex-col">
                                <div className="prose prose-stone max-w-none font-handwriting text-xl md:text-2xl leading-loose text-stone-800 flex-grow overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent max-h-[500px]">
                                    {showContent && loveLetterContent.split('\n').map((line, index) => (
                                        <motion.p
                                            key={index}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.2 + (index * 0.1) }}
                                            className={`${index === 0 ? 'text-3xl text-rose-600 font-bold mb-6' : 'mb-4'}`}
                                        >
                                            {line}
                                        </motion.p>
                                    ))}

                                    {showContent && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 3 }}
                                            className="mt-8 text-right"
                                        >
                                            <p className="text-rose-500 font-bold text-2xl">~ Forever Yours</p>
                                        </motion.div>
                                    )}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 4 }}
                                    className="pt-6 mt-4 border-t border-rose-100 flex justify-end"
                                >
                                    <button
                                        onClick={handleContinue}
                                        className="group flex items-center gap-3 px-6 py-3 bg-white/50 hover:bg-white border-2 border-rose-200 hover:border-rose-400 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                                    >
                                        <span className="font-display text-rose-800 font-semibold group-hover:text-rose-600">
                                            Turn Page to Menu
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                                            <FaArrowRight className="text-rose-500 text-sm" />
                                        </div>
                                    </button>
                                </motion.div>
                            </div>

                            {/* Folded Corner Effect */}
                            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-stone-200/50 to-transparent pointer-events-none rounded-tl-3xl"></div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default WelcomePage;
