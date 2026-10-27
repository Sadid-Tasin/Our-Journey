import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaUnlock, FaLock } from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';

interface LoginPageProps {
    onSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: ''
    });
    const [error, setError] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // উত্তরগুলো মিলিয়ে দেখার জন্য (ছোট হাতের অক্ষরে রূপান্তর করে)
        const ans1 = answers.q1.trim().toLowerCase();
        const ans2 = answers.q2.trim().toLowerCase();
        const ans3 = answers.q3.trim().toLowerCase();

        // সঠিক উত্তরের সাথে মেলানো
        if (ans1 === "30th may" && ans2 === "ar poiren na" && ans3 === "moharani") {
            setError(false);
            setIsUnlocking(true);
            setTimeout(() => {
                onSuccess();
            }, 1500); // ১.৫ সেকেন্ডের সুন্দর একটি অ্যানিমেশন হবে
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-love-100 flex items-center justify-center p-4">
            {/* পেছনের ভাসমান হার্ট অ্যানিমেশন */}
            <FloatingHearts count={12} />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
                    
                    <div className="text-center mb-8">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-500 mb-4 shadow-inner"
                        >
                            {isUnlocking ? <FaUnlock className="text-3xl" /> : <FaLock className="text-3xl" />}
                        </motion.div>
                        <h1 className="text-3xl font-display text-rose-900 mb-2">Unlock My Heart</h1>
                        <p className="text-rose-600/80 font-handwriting text-lg">Answer these to continue our journey...</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Question 1 */}
                        <div>
                            <label className="block text-rose-800 font-medium mb-2 text-sm">
                                1. The magical day our eyes first met...
                            </label>
                            <input 
                                type="text"
                                value={answers.q1}
                                onChange={(e) => setAnswers({...answers, q1: e.target.value})}
                                placeholder="e.g. 1st January"
                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-slate-700"
                            />
                        </div>

                        {/* Question 2 */}
                        <div>
                            <label className="block text-rose-800 font-medium mb-2 text-sm">
                                2. The very first words of our journey...
                            </label>
                            <input 
                                type="text"
                                value={answers.q2}
                                onChange={(e) => setAnswers({...answers, q2: e.target.value})}
                                placeholder="Your answer here..."
                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-slate-700"
                            />
                        </div>

                        {/* Question 3 */}
                        <div>
                            <label className="block text-rose-800 font-medium mb-2 text-sm">
                                3. The sweet nickname I secretly call you...
                            </label>
                            <input 
                                type="text"
                                value={answers.q3}
                                onChange={(e) => setAnswers({...answers, q3: e.target.value})}
                                placeholder="Nickname..."
                                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-slate-700"
                            />
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm text-center font-medium"
                            >
                                Oops! Some answers aren't quite right. Try again love! 🥺
                            </motion.p>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isUnlocking}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                                isUnlocking 
                                ? 'bg-green-500 shadow-green-300/50' 
                                : 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-300/50'
                            }`}
                        >
                            {isUnlocking ? (
                                <>Unlocked Successfully ✨</>
                            ) : (
                                <>
                                    <FaHeart /> Let Me In
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
