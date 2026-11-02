import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaArrowLeft,
    FaExpand,
    FaTimes,
    FaCrown,
    FaFeather,
    FaFolder,
    FaPlus,
    FaLock,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
    FaPlay,
    FaPause,
} from 'react-icons/fa';
import FloatingHearts from '../components/FloatingHearts';
import { supabase } from '../lib/supabase';

interface GalleryPageProps {
    onBack: () => void;
}

const BUCKET = 'Gallery of memories';
const SLIDE_INTERVAL_MS = 3000; // autoplay e koto second por pic bodlabe

// Supabase-er asol 5 ta folder-er nam
const FOLDERS = [
    'Her Little World',
    'Little Surprises',
    'My Beautiful Moharani',
    'Our Forever Moments',
    'Some cute activity'
];

const GalleryPage: React.FC<GalleryPageProps> = ({ onBack }) => {
    const [activeFolder, setActiveFolder] = useState<string>(FOLDERS[0]);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // ---- Slideshow state ----
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const touchStartX = useRef<number | null>(null);

    // ---- Upload / login related state ----
    const [session, setSession] = useState<any>(null);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Login session track kora
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => setSession(data.session));
        const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });
        return () => sub.subscription.unsubscribe();
    }, []);

    // Supabase theke active folder-er chobi fetch kora
    useEffect(() => {
        async function fetchImages() {
            setLoading(true);
            const { data, error } = await supabase
                .storage
                .from(BUCKET)
                .list(activeFolder, {
                    limit: 200,
                    sortBy: { column: 'name', order: 'asc' },
                });

            if (error) {
                console.error('Error fetching images:', error);
                setImages([]);
            } else if (data) {
                // Placeholder ar sub-folder bad deya
                const validFiles = data.filter(
                    (file: any) => file.id !== null && file.name !== '.emptyFolderPlaceholder'
                );

                // Public URL generate kora
                const urls = validFiles.map((file: any) => {
                    const { data: publicUrlData } = supabase
                        .storage
                        .from(BUCKET)
                        .getPublicUrl(`${activeFolder}/${file.name}`);
                    return publicUrlData.publicUrl;
                });
                setImages(urls);
            }
            setLoading(false);
        }

        fetchImages();
    }, [activeFolder, refreshKey]);

    // ---------- Slideshow controls ----------
    const closeViewer = useCallback(() => {
        setSelectedIndex(null);
        setIsPlaying(false);
    }, []);

    const showNext = useCallback(() => {
        setSelectedIndex((i) => (i === null || images.length === 0 ? null : (i + 1) % images.length));
    }, [images.length]);

    const showPrev = useCallback(() => {
        setSelectedIndex((i) =>
            i === null || images.length === 0 ? null : (i - 1 + images.length) % images.length
        );
    }, [images.length]);

    const startSlideshow = () => {
        if (images.length === 0) return;
        setSelectedIndex(0);
        setIsPlaying(true);
    };

    // Autoplay
    useEffect(() => {
        if (!isPlaying || selectedIndex === null || images.length < 2) return;
        const timer = setInterval(showNext, SLIDE_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [isPlaying, selectedIndex, images.length, showNext]);

    // Pore ashbe emon pic ta age theke load kore rakha (smooth transition er jonno)
    useEffect(() => {
        if (selectedIndex === null || images.length < 2) return;
        const preload = new Image();
        preload.src = images[(selectedIndex + 1) % images.length];
    }, [selectedIndex, images]);

    // Keyboard: <- -> Space Esc
    useEffect(() => {
        if (selectedIndex === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') showNext();
            else if (e.key === 'ArrowLeft') showPrev();
            else if (e.key === 'Escape') closeViewer();
            else if (e.key === ' ') {
                e.preventDefault();
                setIsPlaying((p) => !p);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedIndex, showNext, showPrev, closeViewer]);

    // Phone swipe
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) {
            if (diff < 0) showNext();
            else showPrev();
        }
        touchStartX.current = null;
    };

    // ---------- Admin login ----------
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.message);
        } else {
            setShowLogin(false);
            setPassword('');
        }
    };

    // ---------- Photo upload ----------
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploading(true);

        for (const file of Array.from(files)) {
            const ext = file.name.split('.').pop();
            const safeName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
            const { error } = await supabase
                .storage
                .from(BUCKET)
                .upload(`${activeFolder}/${safeName}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                });
            if (error) {
                console.error('Upload error:', error);
                alert('Upload failed: ' + error.message);
            }
        }

        setUploading(false);
        setRefreshKey((k) => k + 1); // gallery auto refresh
        e.target.value = '';
    };

    const currentImage = selectedIndex !== null ? images[selectedIndex] : null;

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
                <div className="flex flex-wrap justify-center gap-3 mb-6 relative z-10">
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
                            <span>{folder}</span>
                        </button>
                    ))}
                </div>

                {/* Action row: slideshow + admin */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8 relative z-10">
                    {/* Slideshow button (shobai dekhbe) */}
                    {!loading && images.length > 0 && (
                        <button
                            onClick={startSlideshow}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-rose-600 text-sm font-medium hover:bg-rose-100 transition-colors shadow-md border border-rose-100"
                        >
                            <FaPlay className="text-xs" />
                            <span>Play slideshow</span>
                        </button>
                    )}

                    {/* Admin area: lock icon (logged out) / upload button (logged in) */}
                    {session ? (
                        <>
                            <label className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 text-white text-sm font-medium cursor-pointer hover:bg-rose-600 transition-colors shadow-md">
                                <FaPlus />
                                <span>{uploading ? 'Uploading...' : `Add photos to "${activeFolder}"`}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    disabled={uploading}
                                    onChange={handleUpload}
                                />
                            </label>
                            <button
                                onClick={() => supabase.auth.signOut()}
                                className="p-2.5 rounded-full bg-white/80 text-rose-500 hover:bg-rose-100"
                                title="Logout"
                            >
                                <FaSignOutAlt />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="p-2.5 rounded-full bg-white/60 text-rose-300 hover:text-rose-500 transition-colors"
                            title="Admin login"
                        >
                            <FaLock />
                        </button>
                    )}
                </div>

                {/* Login popup */}
                {showLogin && !session && (
                    <div
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                        onClick={() => setShowLogin(false)}
                    >
                        <div
                            className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold text-rose-600">Admin login</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-rose-200 rounded-lg px-3 py-2"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-rose-200 rounded-lg px-3 py-2"
                            />
                            <button
                                onClick={handleLogin}
                                className="w-full bg-rose-500 text-white rounded-lg py-2 font-medium"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <p className="text-rose-400 animate-pulse font-medium text-lg">Loading memory photos...</p>
                    </div>
                )}

                {/* Gallery Grid */}
                {!loading && (
                    <div className="relative">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 relative z-10">
                            {images.map((url, index) => (
                                <motion.div
                                    key={url}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    onClick={() => {
                                        setSelectedIndex(index);
                                        setIsPlaying(false);
                                    }}
                                    className="group cursor-pointer relative"
                                >
                                    <div className="aspect-square bg-rose-100 rounded-2xl shadow-lg overflow-hidden relative group-hover:shadow-2xl transition-all duration-300 border-2 border-white/60">
                                        <img
                                            src={url}
                                            alt={`${activeFolder}_${index}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={() => console.error('IMAGE FAILED:', url)}
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
            </div>

            {/* Slideshow viewer */}
            {currentImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
                    onClick={closeViewer}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Top bar: counter + play/pause + close */}
                    <div
                        className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-4 text-white z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="text-sm font-medium bg-white/10 rounded-full px-3 py-1">
                            {(selectedIndex ?? 0) + 1} / {images.length}
                        </span>
                        <div className="flex items-center gap-3">
                            {images.length > 1 && (
                                <button
                                    onClick={() => setIsPlaying((p) => !p)}
                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                    title={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                            )}
                            <button
                                onClick={closeViewer}
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                title="Close"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Prev arrow */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                showPrev();
                            }}
                            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
                            title="Previous"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    {/* Image with crossfade */}
                    <div className="w-full h-full flex items-center justify-center px-4 md:px-20 py-20">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImage}
                                src={currentImage}
                                alt="Memory"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.35 }}
                                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl select-none"
                                onClick={(e) => e.stopPropagation()}
                                draggable={false}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Next arrow */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                showNext();
                            }}
                            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
                            title="Next"
                        >
                            <FaChevronRight />
                        </button>
                    )}

                    {/* Autoplay progress bar */}
                    {isPlaying && images.length > 1 && (
                        <motion.div
                            key={`progress-${selectedIndex}`}
                            className="absolute bottom-0 left-0 h-1 bg-rose-400"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: 'linear' }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
