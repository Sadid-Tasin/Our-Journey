import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { messages } from '../data/content';
import FloatingHearts from '../components/FloatingHearts';

interface MessagesPageProps {
    onBack: () => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ onBack }) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-love-50 via-rose-50 to-love-100">
            <FloatingHearts count={8} />

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
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-5xl mb-4"
                    >
                        💌
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-display text-love-900 mb-2">
                        Messages from My Heart
                    </h1>
                    <p className="font-handwriting text-xl text-rose-400">
                        Every word written with love
                    </p>
                </motion.div>

                {/* Messages */}
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                        >
                            <motion.div
                                onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                                whileHover={{ y: -3 }}
                                className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 md:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:bg-white/90"
                            >
                                <div className="flex items-start gap-4">
                                    <motion.span
                                        className="text-3xl md:text-4xl flex-shrink-0"
                                        animate={{ rotate: expandedId === msg.id ? [0, 10, -10, 0] : 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {msg.emoji}
                                    </motion.span>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-display text-love-900 mb-1 flex items-center gap-2">
                                            {msg.title}
                                            <FaHeart className="text-rose-400 text-sm" />
                                        </h3>

                                        <AnimatePresence>
                                            {expandedId === msg.id ? (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="text-love-700/80 leading-relaxed mt-3 font-light text-lg"
                                                >
                                                    {msg.content}
                                                </motion.p>
                                            ) : (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-love-500/60 text-sm mt-1"
                                                >
                                                    Tap to read... 💕
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
