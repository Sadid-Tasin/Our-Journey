// File: src/pages/MessagesPage.tsx (অথবা আপনার যে ফোল্ডারে আছে)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaLanguage } from 'react-icons/fa';
import { messages } from '../data/content';
import FloatingHearts from '../components/FloatingHearts';

interface MessagesPageProps {
    onBack: () => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ onBack }) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [banglaMode, setBanglaMode] = useState<{ [key: number]: boolean }>({});
    
    // States for the secret note feature
    const [secretText, setSecretText] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Language Toggle Function
    const toggleLanguage = (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // বাটনে ক্লিক করলে যেন কার্ড বন্ধ না হয়ে যায়
        setBanglaMode(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Secret Note Save Function
    const handleSaveSecret = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!secretText.trim()) return;
        
        setIsSaving(true);
        
        // এখানে আপনার ডাটাবেস এ সেভ করার API বসাতে হবে (আপাতত কনসোলে দেখাবে)
        console.log("Secret saved to database:", secretText);

        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setSecretText(""); // টেক্সট ক্লিয়ার করা
            
            // ৩ সেকেন্ড পর সাকসেস মেসেজ সরিয়ে নেওয়া
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

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

                {/* Messages List */}
                <div className="space-y-6">
                    {messages.map((msg, index) => {
                        const isBangla = banglaMode[msg.id];
                        const displayContent = isBangla ? msg.banglaContent : msg.content;
                        const isSecretMessage = msg.title === "A little secret"; // শুধু এই মেসেজটিতে ইনপুট বক্স দেখাবে

                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                            >
                                <motion.div
                                    onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                                    whileHover={{ y: -3 }}
                                    className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 md:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:bg-white/90"
                                >
                                    {/* Language Toggle Button (EN/BN) */}
                                    <button
                                        onClick={(e) => toggleLanguage(msg.id, e)}
                                        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-full shadow-sm transition-all duration-200"
                                        title="Switch Language"
                                    >
                                        <FaLanguage className="text-sm" />
                                        <span>{isBangla ? 'EN' : 'BN'}</span>
                                    </button>

                                    <div className="flex items-start gap-4 pr-12 md:pr-16">
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
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <p className="text-love-700/80 leading-relaxed mt-3 font-light text-lg whitespace-pre-wrap">
                                                            {displayContent}
                                                        </p>
                                                        
                                                        {/* Secret Note Input Section (শুধু A little secret এর জন্য) */}
                                                        {isSecretMessage && (
                                                            <div 
                                                                className="mt-6 pt-5 border-t border-rose-200/50"
                                                                onClick={(e) => e.stopPropagation()} 
                                                            >
                                                                <textarea
                                                                    value={secretText}
                                                                    onChange={(e) => setSecretText(e.target.value)}
                                                                    placeholder={isBangla ? "তোমার গোপন কথাটি এখানে লেখো..." : "Type your secret here..."}
                                                                    className="w-full p-4 rounded-xl bg-white/60 border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none text-love-700 placeholder-love-400/70"
                                                                    rows={3}
                                                                />
                                                                <div className="flex justify-end mt-3">
                                                                    <button
                                                                        onClick={handleSaveSecret}
                                                                        disabled={isSaving || !secretText.trim()}
                                                                        className={`px-5 py-2 rounded-lg font-medium transition-all ${
                                                                            saveSuccess 
                                                                            ? "bg-green-500 text-white" 
                                                                            : "bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                                                                        }`}
                                                                    >
                                                                        {saveSuccess 
                                                                            ? (isBangla ? "সেভ হয়েছে! ✨" : "Saved! ✨") 
                                                                            : isSaving 
                                                                                ? (isBangla ? "সেভ হচ্ছে..." : "Saving...") 
                                                                                : (isBangla ? "আমাকে বলো" : "Tell Me")}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </motion.div>
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
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
