import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaHeartBroken, FaLock, FaGift } from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';

const customQuestions = [
    {
        id: 1,
        question: "The magical day our eyes first met...",
        answer: "30th May"
    },
    {
        id: 2,
        question: "The very first words of our journey...",
        answer: "Ar poiren na"
    },
    {
        id: 3,
        question: "The sweet nickname I secretly call you...",
        answer: "Moharani"
    }
];

interface LoginPageProps {
    onSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
    const [answers, setAnswers] = useState<string[]>(new Array(customQuestions.length).fill(''));
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        if (showError) setShowError(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setShowError(false);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const isCorrect = customQuestions.every(
            (q, i) => answers[i].trim().toLowerCase() === q.answer.toLowerCase()
        );

        if (isCorrect) {
            setShowSuccess(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            onSuccess();
        } else {
            setShowError(true);
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            scale: 1.2,
            filter: "blur(10px)",
            transition: { duration: 0.5 }
        }
    };

    const giftVariants = {
        hover: {
            scale: 1.05,
            rotate: [0, -2, 2, -2, 0],
            transition: { duration: 0.5 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-love-50 via-rose-50 to-love-100 p-4 perspective-1000">
            <FloatingHearts count={15} />

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center p-8"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-9xl mb-8 filter drop-shadow-2xl"
                            >
                                📖
                            </motion.div>
                            <h2 className="text-5xl font-display text-rose-600 mb-6">Chapter One Begins...</h2>
                            <p className="text-2xl font-handwriting text-rose-400">Welcome to our story, my love.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="gift-box"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative z-10 flex flex-col items-center"
                    >
                        <motion.div
                            variants={giftVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleOpen}
                            className="cursor-pointer relative group"
                        >
                            <div className="w-64 h-64 bg-rose-500 rounded-3xl shadow-2xl flex items-center justify-center relative transform rotate-3 transition-all duration-500 group-hover:rotate-0">
                                <div className="absolute inset-x-0 top-1/2 h-16 bg-rose-300 -translate-y-1/2 opacity-80" />
                                <div className="absolute inset-y-0 left-1/2 w-16 bg-rose-300 -translate-x-1/2 opacity-80" />

                                <div className="relative z-10 bg-white/20 backdrop-blur-sm p-6 rounded-full border-4 border-white/40 shadow-inner">
                                    <FaLock className="text-white text-5xl drop-shadow-md"/>
                                </div>

                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-20">
                                <div className="absolute left-0 w-16 h-16 border-8 border-rose-400 rounded-full rounded-br-none -rotate-45" />
                                <div className="absolute right-0 w-16 h-16 border-8 border-rose-400 rounded-full rounded-bl-none rotate-45" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-center"
                        >
                            <h1 className="text-4xl font-display text-rose-800 mb-3">A Gift For You</h1>
                            <p className="text-rose-600 font-handwriting text-2xl animate-pulse">Tap to unlock our story...</p>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="open-book"
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="relative z-10 w-full max-w-4xl perspective-1000"
                    >
                        <div className="absolute inset-2 top-0 bottom-4 bg-rose-900 rounded-r-lg shadow-2xl transform translate-x-2 translate-y-2 z-0"></div>

                        <div className="relative flex flex-col md:flex-row bg-[#fdfbf7] rounded-lg shadow-2xl overflow-hidden min-h-[600px] border-r-8 border-b-8 border-rose-900/20">
                            
                            <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-stone-200 relative">
                                <div className="absolute inset-0 opacity-10 pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(#af8f8f 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                <div className="h-full flex flex-col justify-center items-center text-center relative z-10">
                                    <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-8 mx-auto border-4 border-rose-200">
                                        <FaHeart className="text-rose-400 text-4xl animate-pulse-soft"/>
                                    </div>

                                    <h2 className="text-4xl lg:text-5xl font-display text-rose-900 mb-6 italic">
                                        Our Story
                                    </h2>

                                    <div className="space-y-4 font-serif text-stone-600 leading-relaxed text-lg">
                                        <p>
                                            "Every love story is beautiful, but ours is my favorite."
                                        </p>
                                        <div className="w-16 h-1 bg-rose-200 mx-auto my-6 rounded-full"></div>
                                        <p className="italic text-rose-700/80">
                                            Hidden within these pages are the keys to my heart.
                                            Prove that you know me best.
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-8 text-sm text-stone-400 font-serif italic">
                                        Page 1 of Infinite
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-12 bg-gradient-to-r from-stone-300/20 via-transparent to-stone-300/20 -translate-x-1/2 pointer-events-none z-20"></div>

                            <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#fffcf5] relative">
                                <div className="h-full flex flex-col relative z-10">
                                    <h3 className="text-2xl font-display text-rose-800 mb-8 border-b-2 border-rose-100 pb-2 inline-block self-start">
                                        The Questions
                                    </h3>

                                    <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                                        {customQuestions.map((question, index) => (
                                            <div key={question.id} className="relative group">
                                                <label className="block text-sm font-bold text-stone-700 mb-1 font-serif">
                                                    Ques {index + 1}:
                                                </label>
                                                <p className="text-rose-600 text-sm mb-2 italic font-serif">
                                                    "{question.question}"
                                                </p>
                                                <input
                                                    type="text"
                                                    value={answers[index]}
                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    className="w-full px-0 py-2 bg-transparent border-b border-stone-300 focus:border-rose-500 outline-none transition-colors font-handwriting text-2xl text-rose-900 placeholder-stone-300"
                                                    placeholder="Your answer..."
                                                    required
                                                />
                                            </div>
                                        ))}

                                        <AnimatePresence>
                                            {showError && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="pt-2 text-center"
                                                >
                                                    <p className="text-red-500 font-handwriting text-xl flex items-center justify-center gap-2">
                                                        <FaHeartBroken className="text-sm"/>
                                                        <span>Try reading our story again...</span>
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="pt-6 mt-auto">
                                            <motion.button
                                                type="submit"
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-3 bg-rose-900 text-rose-50 font-display uppercase tracking-widest text-sm rounded hover:bg-rose-800 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                            >
                                                {isLoading ? (
                                                    <span>Turning Page...</span>
                                                ) : (
                                                    <>
                                                        <span>Unlock Chapters</span>
                                                        <FaGift className="text-xs"/>
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>

                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-stone-200/50 to-transparent pointer-events-none rounded-bl-3xl"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LoginPage;
