import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExpand, FaTimes, FaCrown, FaFeather, FaFolder } from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';
import { supabase } from '../lib/supabase'; // Path thik ache kina dekhe nibe

interface GalleryPageProps {
    onBack: () => void;
}

// Supabase-e banano 5'ta folder-er hoboho nam ekhane dibe
const FOLDERS = ['nature', 'events', 'portraits', 'travel', 'random'];

const GalleryPage: React.FC<GalleryPageProps> = ({ onBack }) => {
    const [activeFolder, setActiveFolder] = useState<string>(FOLDERS[0]);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Supabase theke active folder-er chobi fetch kora
    useEffect(() => {
        async function fetchImages() {
            setLoading(true);
            const { data, error } = await supabase
                .storage
                .from('gallery-images') // Tomar bucket name
                .list(activeFolder, {
                    limit: 200,
                    sortBy: { column: 'name', order: 'asc' },
                });

            if (error) {
                console.error('Error fetching images:', error);
                setImages([]);
            } else if (data) {
                // Placeholder bad deya (TypeScript 'any' type error fixed)
                const validFiles = data.filter((file: any) => file.name !== '.emptyFolderPlaceholder');
                
                // Public URL generate kora (TypeScript 'any' type error fixed)
                const urls = validFiles.map((file: any) => {
                    const { data: publicUrlData } = supabase
                        .storage
                        .from('gallery-images')
                        .getPublicUrl(`${activeFolder}/${file.name}`);
                    return publicUrlData.publicUrl;
                });
                setImages(urls);
            }
            setLoading(false);
        }

        fetchImages();
    }, [activeFolder]);

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
                    className="text-center mb-8"
                >
                    <motion.div className="relative mb-6">
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
                </motion.div>

                {/* 5 Folder Tabs Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
                    {FOLDERS.map((folder) => (
                        <button
                            key={folder}
                            onClick={() => setActiveFolder(folder)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${
                                activeFolder === folder
                                    ? 'bg-rose-500 text-white shadow-rose-300 scale-105'
                                    : 'bg-white/80 text-rose-700 hover:bg-rose-100 backdrop-blur-sm'
                            }`}
                        >
                            <FaFolder className={activeFolder === folder ? 'text-white' : 'text-rose-400'} />
                            <span className="capitalize">{folder}</span>
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <p className="text-rose-400 animate-pulse font-medium text-lg">Loading memory photos...</p>
                    </div>
                )}

                {/* Enhanced Gallery Grid with Supabase Real Images */}
                {!loading && (
                    <div className="relative">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 relative z-10">
                            {images.map((url, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    onClick={() => setSelectedImage(url)}
                                    className="group cursor-pointer relative"
                                >
                                    <div className="aspect-square bg-rose-100 rounded-2xl shadow-lg overflow-hidden relative group-hover:shadow-2xl transition-all duration-300 border-2 border-white/60">
                                        <img
                                            src={url}
                                            alt={`${activeFolder}_${index}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                                                <FaExpand className="text-xl" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {images.length === 0 && (
                            <div className="text-center py-16 bg-white/40 rounded-3xl backdrop-blur-sm border border-rose-100">
                                <p className="text-rose-400 text-lg">No photos found in this folder yet!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Lightbox Modal for Full View */}
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
                            className="max-w-4xl w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white hover:text-rose-300 text-2xl transition-colors"
                            >
                                <FaTimes />
                            </button>
                            <div className="bg-black/40 rounded-2xl overflow-hidden shadow-2xl p-2 border border-white/20">
                                <img
                                    src={selectedImage}
                                    alt="Selected view"
                                    className="max-h-[80vh] w-auto mx-auto object-contain rounded-xl"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;
