import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaArrowRight, FaLanguage } from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';

interface WelcomePageProps {
    onContinue: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onContinue }) => {
    const [isBangla, setIsBangla] = useState(false);

    const englishText = `When I first saw you, I probably didn't know who you were. I didn't know anything about you, and I certainly had no idea that one day you would become such an important part of my life. But after a little while, I realized one thing—you weren't like everyone else. You were someone special.

You were the kind of person who rarely talked to anyone, didn't easily mix with people, and preferred to stay away from everyone, living quietly in your own little world. You were so different that most people didn't even have the courage to approach you.

Somewhere in my heart, I started feeling that maybe, after all these years of searching, I had finally found the person I had always wished for.

But honestly, I had neither the courage nor the opportunity to start a conversation with you. So, one day, I went home and tried to find out everything I could about you. After two days, I finally gathered enough courage to talk to you—and guess what? All I managed to ask was your name! 🤦🏻

Then, because of exams, we didn't see each other for quite some time. But a few days later, I found you again near Jafor Sir's place. That day, I called out to you for the very first time in such a way that everyone around us turned and stared!

After that, you disappeared from sight for almost another week. So, the next time we met, you gave me your Facebook ID. And what did I do? I went home and completely forgot about it! 😂

A few days later, when we met again, you asked me why I hadn't sent you a friend request. Without wasting a second, I came up with an excuse and said that I couldn't find your ID. But the truth was much funnier—I was so absent-minded that I simply forgot to search for it after getting home!

Then came your direct order: "Go, bring your phone right now!"
And just like that, I ran off to get my phone. When I came back, you searched for your own ID and sent me the friend request yourself.

And even after all that, I still didn't send you a single message!

Until one unexpected night, a message popped up on my phone from you:

"Ar poiren na"

And that was where it all began...
From that one little message, our journey together slowly started. Two people who were once strangers gradually became a part of each other's stories.

Perhaps neither of us knew that such a simple conversation would become the beginning of something so beautiful.

And that's how our story began...

Our Journey.........♾️`;

    const banglaText = `তোমাকে যখন প্রথম দেখেছিলাম হয়তো চিনতাম না, না জানতাম ভবিষ্যতে এ কি হতে যাচ্ছে। কিন্তু কিছ সময় পর এইটুকু জানতে পেরেছিলাম তুমি সবার মতো না, You are some special। যে মানুষ কিনা কারোর সাথে কোথা বলে না, কারোর সাথে মিশে না, সবার থেকে আলাদা থাকে জাস্ট নিজের দুনিয়ায়, কেউ তার সাথে কোথা বলার সাহস টাও পায় না।

তখন মনে হচ্ছিল হয়তো এত বছর ধরে যেই মানুষটাকে খুঁজে এসেছি আমার মনের মতো হয়তো সেই মানুষটাকে পেয়ে গেছি। প্রথমে কিভাবে কোথা বলবো এই সাহস বা উপায় কোনোটাই পাইনি। বাসায় গিয়ে তোমার সব তথ্য খুঁজে বের করি। এরপর ২ দিন পর সাহস করে কথা বলি টাও শুধু নাম। 🤦🏻

এরপর হয়তো পরীক্ষা এর পর অনেকদিন দেখা হয়নি। কিন্তু কিছোদিন পর আবার খুঁজে পাই জাফর স্যার এর ঐখানে, এরপর প্রথমবারসোমার সামনে এমনভাবে ডাকছিলাম যে সবাই জাস্ট তাকিয়ে ছিলো। এরপর ১ সপ্তাহ আর তোমাকে পাওয়া গেলনা, এর জন্য পরবর্তী দিন তুমি প্রথমার আমাকে তুমার FB 🆔 দিলে। আর আমি? বাসায় গিয়ে সুন্দরভাবে সব ভুলে গেলাম! 😂

তার ঠিক কিছু দিন পর তুমার সাথে আবার দেখা এর পর তুমি আমাকে জিজ্ঞাসা করলে যে আমি কেন তুমাকে ফ্রেন্ড রিকোয়েস্ট পাঠাইনি। আমি সাথে সাথে ১ তা অজুহাত দিলাম যে 🆔 খুঁজে পাইনি, কিন্তু সত্যটি ছিলো আমি এতই ভুলো মন যে আর সার্চ এই করিনি। এর পর আপনার সরাসরি অর্ডার হলো যে যাও এখনি তুমার মোবাইল নিয়ে আসো, এবং যেই বলা সেই কাজ,আমিও সুন্দরভাবে ১ দৌড় এ মোবাইল নিয়ে আসলাম এবং তুমি নিজের আইডি খুঁজে অ্যাড দিয়ে রাখলে।

এরপরও কিন্তু আমি তোমাকে কোনো Message দিইনি!

হটাৎ ১ দিন রাত এ ১ টা Message আসে যে-

"Ar poiren na" 

এই ছোট্ট একটা Message থেকেই শুরু হয়েছিল আমাদের একসঙ্গে পথচলা। ধীরে ধীরে অচেনা দুজন মানুষ একে অপরের গল্পের অংশ হয়ে উঠলাম।

হয়তো সেদিন আমরা কেউই জানতাম না, এই ছোট্ট কথোপকথন একদিন এত সুন্দর একটা গল্পের শুরু হয়ে থাকবে।

আর এভাবেই শুরু হয়েছিল আমাদের গল্প..............

Our Journey.........♾️`;

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-rose-50 via-pink-50 to-love-100 flex items-center justify-center p-4 md:p-8">
            <FloatingHearts count={12} />
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-12 flex flex-col max-h-[90vh]"
            >
                {/* Header with Translation Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-rose-200 pb-6 gap-4 shrink-0">
                    <h1 className="text-4xl md:text-5xl font-display text-rose-800">
                        {isBangla ? "প্রিয় মহারাণী," : "My Dearest Love,"}
                    </h1>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsBangla(!isBangla)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-rose-200 hover:border-rose-400 text-rose-700 rounded-full transition-all font-medium text-sm shadow-sm"
                    >
                        <FaLanguage className="text-xl" />
                        {isBangla ? "Read in English" : "বাংলায় পড়ুন"}
                    </motion.button>
                </div>

                {/* Letter Content Area (Scrollable) */}
                <div className="flex-1 overflow-y-auto pr-4 mb-6 scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent">
                    <div className="prose prose-rose max-w-none font-serif text-slate-700 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isBangla ? 'bn' : 'en'}
                                initial={{ opacity: 0, x: isBangla ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isBangla ? 20 : -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {isBangla ? banglaText : englishText}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="flex justify-center pt-6 border-t border-rose-100 shrink-0">
                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onContinue}
                        className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-2xl font-bold text-lg md:text-xl shadow-lg hover:shadow-rose-300/50 transition-all flex items-center gap-3"
                    >
                        Continue Our Journey <FaArrowRight />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default WelcomePage;
