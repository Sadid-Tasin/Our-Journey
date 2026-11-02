import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaArrowRight, FaFeatherAlt } from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';

interface WelcomePageProps {
    onContinue: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onContinue }) => {
    const [showContent, setShowContent] = useState(false);
    const [isTurning, setIsTurning] = useState(false);
    const [isBangla, setIsBangla] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleContinue = () => {
        setIsTurning(true);
        setTimeout(onContinue, 600);
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

    const englishContent = [
        `When I first saw you, I probably didn't know who you were. I didn't know anything about you, and I certainly had no idea that one day you would become such an important part of my life. But after a little while, I realized one thing—you weren't like everyone else. You were someone special.`,
        `You were the kind of person who rarely talked to anyone, didn't easily mix with people, and preferred to stay away from everyone, living quietly in your own little world. You were so different that most people didn't even have the courage to approach you.`,
        `Somewhere in my heart, I started feeling that maybe, after all these years of searching, I had finally found the person I had always wished for.`,
        `But honestly, I had neither the courage nor the opportunity to start a conversation with you. So, one day, I went home and tried to find out everything I could about you. After two days, I finally gathered enough courage to talk to you—and guess what? All I managed to ask was your name! 🤦🏻`,
        `Then, because of exams, we didn't see each other for quite some time. But a few days later, I found you again near Jafor Sir's place. That day, I called out to you for the very first time in such a way that everyone around us turned and stared!`,
        `After that, you disappeared from sight for almost another week. So, the next time we met, you gave me your Facebook ID. And what did I do? I went home and completely forgot about it! 😂`,
        `A few days later, when we met again, you asked me why I hadn't sent you a friend request. Without wasting a second, I came up with an excuse and said that I couldn't find your ID. But the truth was much funnier—I was so absent-minded that I simply forgot to search for it after getting home!`,
        `Then came your direct order: "Go, bring your phone right now!"`,
        `And just like that, I ran off to get my phone. When I came back, you searched for your own ID and sent me the friend request yourself.`,
        `And even after all that, I still didn't send you a single message!`,
        `Until one unexpected night, a message popped up on my phone from you:`,
        `"Ar poiren na"`,
        `And that was where it all began...`,
        `From that one little message, our journey together slowly started. Two people who were once strangers gradually became a part of each other's stories.`,
        `Perhaps neither of us knew that such a simple conversation would become the beginning of something so beautiful.`,
        `And that's how our story began...`,
        `Our Journey.........♾️`
    ];

    const banglaContent = [
        `তোমাকে যখন প্রথম দেখেছিলাম হয়তো চিনতাম না, না জানতাম ভবিষ্যতে এ কি হতে যাচ্ছে। কিন্তু কিছ সময় পর এইটুকু জানতে পেরেছিলাম তুমি সবার মতো না, You are some special। যে মানুষ কিনা কারোর সাথে কোথা বলে না, কারোর সাথে মিশে না, সবার থেকে আলাদা থাকে জাস্ট নিজের দুনিয়ায়, কেউ তার সাথে কোথা বলার সাহস টাও পায় না।`,
        `তখন মনে হচ্ছিল হয়তো এত বছর ধরে যেই মানুষটাকে খুঁজে এসেছি আমার মনের মতো হয়তো সেই মানুষটাকে পেয়ে গেছি। প্রথমে কিভাবে কোথা বলবো এই সাহস বা উপায় কোনোটাই পাইনি। বাসায় গিয়ে তোমার সব তথ্য খুঁজে বের করি। এরপর ২ দিন পর সাহস করে কথা বলি টাও শুধু নাম। 🤦🏻`,
        `এরপর হয়তো পরীক্ষা এর পর অনেকদিন দেখা হয়নি। কিন্তু কিছোদিন পর আবার খুঁজে পাই জাফর স্যার এর ঐখানে, এরপর প্রথমবারসোমার সামনে এমনভাবে ডাকছিলাম যে সবাই জাস্ট তাকিয়ে ছিলো। এরপর ১ সপ্তাহ আর তোমাকে পাওয়া গেলনা, এর জন্য পরবর্তী দিন তুমি প্রথমার আমাকে তুমার FB 🆔 দিলে। আর আমি? বাসায় গিয়ে সুন্দরভাবে সব ভুলে গেলাম! 😂`,
        `তার ঠিক কিছু দিন পর তুমার সাথে আবার দেখা এর পর তুমি আমাকে জিজ্ঞাসা করলে যে আমি কেন তুমাকে ফ্রেন্ড রিকোয়েস্ট পাঠাইনি। আমি সাথে সাথে ১ তা অজুহাত দিলাম যে 🆔 খুঁজে পাইনি, কিন্তু সত্যটি ছিলো আমি এতই ভুলো মন যে আর সার্চ এই করিনি। এর পর আপনার সরাসরি অর্ডার হলো যে যাও এখনি তুমার মোবাইল নিয়ে আসো, এবং যেই বলা সেই কাজ,আমিও সুন্দরভাবে ১ দৌড় এ মোবাইল নিয়ে আসলাম এবং তুমি নিজের আইডি খুঁজে অ্যাড দিয়ে রাখলে।`,
        `এরপরও কিন্তু আমি তোমাকে কোনো Message দিইনি!`,
        `হটাৎ ১ দিন রাত এ ১ টা Message আসে যে-`,
        `"Ar poiren na"`,
        `এই ছোট্ট একটা Message থেকেই শুরু হয়েছিল আমাদের একসঙ্গে পথচলা। ধীরে ধীরে অচেনা দুজন মানুষ একে অপরের গল্পের অংশ হয়ে উঠলাম।`,
        `হয়তো সেদিন আমরা কেউই জানতাম না, এই ছোট্ট কথোপকথন একদিন এত সুন্দর একটা গল্পের শুরু হয়ে থাকবে।`,
        `আর এভাবেই শুরু হয়েছিল আমাদের গল্প..............`,
        `Our Journey.........♾️`
    ];

    const currentContent = isBangla ? banglaContent : englishContent;

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
                                
                                {/* Heading & Language Toggle Button */}
                                {showContent && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="flex justify-between items-center mb-6 pb-2 border-b border-rose-100"
                                    >
                                        <h2 className="text-3xl text-rose-600 font-bold font-handwriting">
                                            {isBangla ? "প্রিয় মহারাণী," : "My Dearest Love,"}
                                        </h2>
                                        <button 
                                            onClick={() => setIsBangla(!isBangla)}
                                            className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-full transition-colors text-sm font-semibold shadow-sm"
                                        >
                                            {isBangla ? "Read in English" : "বাংলায় পড়ুন"}
                                        </button>
                                    </motion.div>
                                )}

                                <div className="prose prose-stone max-w-none font-handwriting text-xl md:text-2xl leading-loose text-stone-800 flex-grow overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent max-h-[450px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isBangla ? 'bn' : 'en'}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {showContent && currentContent.map((line, index) => (
                                                <p key={index} className="mb-4">
                                                    {line}
                                                </p>
                                            ))}
                                            {showContent && (
                                                <div className="mt-8 text-right">
                                                    <p className="text-rose-500 font-bold text-2xl">~ Forever Yours</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5 }}
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
