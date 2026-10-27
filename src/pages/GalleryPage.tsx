import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExpand, FaTimes, FaStar, FaHeart, FaCamera, FaCrown, FaFeather } from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';

interface GalleryPageProps {
    onBack: () => void;
}

// Romantic gallery images with enhanced emotional captions
const galleryImages = [
    { id: 1, caption: 'Our first adventure together 💕', color: 'from-rose-300 to-pink-400', emoji: '💕', special: true },
    { id: 2, caption: 'That sunset we never forgot 🌅', color: 'from-amber-300 to-orange-400', emoji: '🌅', special: false },
    { id: 3, caption: 'Laughing at nothing and everything 😂', color: 'from-pink-400 to-rose-500', emoji: '😂', special: false },
    { id: 4, caption: 'My favorite view — you 💖', color: 'from-purple-300 to-violet-400', emoji: '💖', special: true },
    { id: 5, caption: 'Our cozy rainy day ☔', color: 'from-blue-300 to-indigo-400', emoji: '☕', special: false },
    { id: 6, caption: 'The day you made my heart stop 💗', color: 'from-rose-400 to-red-500', emoji: '💗', special: true },
    { id: 7, caption: 'When we danced in the kitchen 💃', color: 'from-pink-300 to-rose-400', emoji: '💃', special: false },
    { id: 8, caption: 'Forever my favorite person 🥰', color: 'from-purple-400 to-fuchsia-500', emoji: '🥰', special: true },
    { id: 9, caption: 'Our little secret spot 🌿', color: 'from-emerald-300 to-teal-400', emoji: '🌿', special: false },
];

const GalleryPage: React.FC<GalleryPageProps> = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
            <FloatingHearts count={12} />
            {/* Romantic decorative elements */}
            <div className="absolute top-20 left-10 text-3xl opacity-20 animate-pulse">✨</div>
            <div className="absolute top-1/3 right-16 text-4xl opacity-15 animate-bounce">💕</div>
            <div className="absolute bottom-1/4 left-20 text-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>💫</div>
            <div className="absolute bottom-20 right-10 text-4xl opacity-15 animate-bounce" style={{ animationDelay: '0.5s' }}>💖</div>

            <div className="relative z-10 px-4 py-8 md:py-16 max-w-6xl mx-auto">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-sky-600 hover:text-sky-500 transition-colors mb-8 group"
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
                        className="relative mb-6"
                    >
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="inline-block"
                        >
                            <FaCrown className="text-6xl text-rose-300 mx-auto drop-shadow-lg" />
                        </motion.div>
                        <motion.div
                            className="absolute -top-2 -right-2 text-2xl"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                            💎
                        </motion.div>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-display mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-purple-600 drop-shadow-sm">
                        Our Beautiful Memories
                    </h1>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <FaFeather className="text-rose-300 text-xl" />
                        </motion.div>
                        <p className="text-xl md:text-2xl font-handwriting text-rose-500">
                            Every moment with you is a masterpiece
                        </p>
                        <motion.div animate={{ rotate: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}>
                            <FaFeather className="text-rose-300 text-xl" />
                        </motion.div>
                    </div>
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                className="text-rose-200 text-lg"
                            >
                                {i % 2 === 0 ? '💖' : '💗'}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Enhanced Gallery Grid with Romantic Effects */}
                <div className="relative">
                    {/* Decorative floating elements around gallery */}
                    <div className="absolute -top-8 -left-8 text-5xl opacity-10">🌸</div>
                    <div className="absolute -top-4 -right-6 text-4xl opacity-10">🌹</div>
                    <div className="absolute -bottom-8 -left-6 text-5xl opacity-10">🌺</div>
                    <div className="absolute -bottom-4 -right-8 text-4xl opacity-10">🌷</div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 relative z-10">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.03 }}
                            onClick={() => setSelectedImage(img.id)}
                            className="group cursor-pointer relative"
                        >
                            <div className={`aspect-square bg-gradient-to-br ${img.color} rounded-2xl shadow-lg overflow-hidden relative group-hover:shadow-2xl transition-all duration-300`}>
                                {/* Placeholder image - gradient with heart */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
                                    <motion.span
                                        className="text-4xl md:text-5xl mb-2"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                                    >
                                        {['💕', '💖', '💗', '💝', '💞', '💘', '🥰', '😍', '💑'][index]}
                                    </motion.span>
                                    <p className="text-xs md:text-sm text-center px-3 font-light opacity-80">
                                        Add your photo here
                                    </p>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                                    <div className="w-full p-3 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white text-xs md:text-sm font-light">{img.caption}</p>
                                    </div>
                                </div>

                                {/* Expand icon */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FaExpand className="text-white text-sm" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    </div>
                </div>

                {/* Lightbox */}
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`aspect-video bg-gradient-to-br ${galleryImages.find(i => i.id === selectedImage)?.color} rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white relative`}>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                                <span className="text-6xl mb-4">
                                    {['💕', '💖', '💗', '💝', '💞', '💘', '🥰', '😍', '💑'][selectedImage - 1]}
                                </span>
                                <p className="text-xl font-handwriting px-6 text-center">
                                    {galleryImages.find(i => i.id === selectedImage)?.caption}
                                </p>
                                <p className="text-sm mt-3 opacity-60">Replace with your real photos!</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;
