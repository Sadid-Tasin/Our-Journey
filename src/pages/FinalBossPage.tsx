import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import {
    bossProfile,
    reasonsJar,
    openWhen,
    loveCoupons,
    quizQuestions,
    quizResults,
} from '../data/content';
import FloatingHearts from '../components/FloatingHearts';

interface FinalBossPageProps {
    onBack: () => void;
    onContinue: () => void;
}

/* ---------- shared styles ---------- */
const glass =
    'bg-white/70 backdrop-blur-xl border border-rose-100 rounded-3xl shadow-lg shadow-rose-200/40';
const gradText =
    'bg-gradient-to-r from-rose-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent';

/* ---------- section wrapper + title ---------- */
const Section: React.FC<{ emoji: string; title: string; hint: string; children: React.ReactNode }> = ({
    emoji,
    title,
    hint,
    children,
}) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-16"
    >
        <div className="text-center mb-6">
            <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl mb-2"
            >
                {emoji}
            </motion.div>
            <h2 className={`text-2xl md:text-3xl font-display ${gradText}`}>{title}</h2>
            <p className="text-sky-500/70 text-sm mt-1">{hint}</p>
        </div>
        {children}
    </motion.section>
);

/* ---------- 1. Boss profile ---------- */
const BossCard: React.FC = () => {
    const [unlocked, setUnlocked] = useState<number[]>([]);
    const toggle = (i: number) =>
        setUnlocked((u) => (u.includes(i) ? u.filter((x) => x !== i) : [...u, i]));

    return (
        <div className={`${glass} p-6 md:p-8`}>
            <div className="flex items-center gap-4 mb-6">
                <motion.div
                    animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-sky-100 border-2 border-rose-200 flex items-center justify-center text-4xl shadow-inner"
                >
                    {bossProfile.emoji}
                </motion.div>
                <div>
                    <h3 className="text-2xl font-display text-love-900">{bossProfile.name}</h3>
                    <p className="text-rose-400 text-sm">{bossProfile.title}</p>
                </div>
            </div>

            {bossProfile.stats.map((s, i) => (
                <div key={s.label} className="mb-4">
                    <div className="flex justify-between text-sm text-sky-700 mb-1">
                        <span>{s.label}</span>
                        <span className="font-medium">{s.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-sky-100 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, delay: i * 0.2, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-fuchsia-500"
                        />
                    </div>
                </div>
            ))}

            <div className="grid gap-3 mt-6">
                {bossProfile.moves.map((m, i) => (
                    <motion.div
                        key={m.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-rose-50/80 rounded-2xl px-4 py-3 text-sky-800"
                    >
                        <span className="font-medium text-love-900">{m.label}: </span>
                        {m.text}
                    </motion.div>
                ))}
            </div>

            <p className="text-xs text-sky-400 mt-6 mb-2">Tap to unlock achievements</p>
            <div className="flex flex-wrap gap-2">
                {bossProfile.badges.map((b, i) => {
                    const on = unlocked.includes(i);
                    return (
                        <motion.button
                            key={b}
                            onClick={() => toggle(i)}
                            whileTap={{ scale: 0.9 }}
                            animate={{ scale: on ? 1.06 : 1, opacity: on ? 1 : 0.45 }}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                                on
                                    ? 'bg-gradient-to-r from-amber-100 to-rose-100 border-amber-300 text-love-900 shadow-md'
                                    : 'bg-white border-rose-100 text-sky-700 grayscale'
                            }`}
                        >
                            {b}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

/* ---------- 2. Reasons jar ---------- */
const ReasonsJar: React.FC = () => {
    const [reason, setReason] = useState<string | null>(null);
    const [shown, setShown] = useState(0);
    const [tick, setTick] = useState(0);
    const bag = useRef<string[]>([]);

    const pull = () => {
        if (bag.current.length === 0) {
            bag.current = [...reasonsJar].sort(() => Math.random() - 0.5);
            setShown(0);
        }
        setReason(bag.current.pop() as string);
        setShown((n) => n + 1);
        setTick((t) => t + 1);
    };

    return (
        <div className={`${glass} p-8 text-center overflow-hidden relative`}>
            <motion.button
                onClick={pull}
                whileTap={{ rotate: [0, -12, 12, -8, 8, 0], scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ y: { duration: 2.5, repeat: Infinity } }}
                className="text-7xl"
                aria-label="Pull a reason"
            >
                🫙
            </motion.button>

            <div className="min-h-[96px] flex items-center justify-center mt-4 relative">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={tick}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                        className="text-lg md:text-xl text-love-800 font-light px-2"
                    >
                        {reason ? `💖 ${reason}` : 'Tap the jar to pull out a reason ✨'}
                    </motion.p>
                </AnimatePresence>
            </div>
            {reason && (
                <p className="text-xs text-sky-400">
                    {shown} of {reasonsJar.length} reasons
                </p>
            )}
        </div>
    );
};

/* ---------- 3. Open When ---------- */
const OpenWhen: React.FC = () => {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <div className="grid gap-4">
            {openWhen.map((e) => {
                const isOpen = open === e.id;
                return (
                    <motion.div
                        key={e.id}
                        layout
                        whileHover={{ y: -3 }}
                        onClick={() => setOpen(isOpen ? null : e.id)}
                        className={`${glass} p-5 cursor-pointer ${isOpen ? 'ring-2 ring-rose-200' : ''}`}
                    >
                        <div className="flex items-center gap-4">
                            <motion.span
                                animate={{ rotate: isOpen ? [0, -15, 15, 0] : 0, scale: isOpen ? 1.25 : 1 }}
                                className="text-3xl"
                            >
                                {isOpen ? '💌' : e.emoji}
                            </motion.span>
                            <p className="text-love-900 font-medium flex-1">{e.title}</p>
                            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-rose-300">
                                ▾
                            </motion.span>
                        </div>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.p
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden text-sky-800 leading-relaxed pt-4 font-light"
                                >
                                    {e.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

/* ---------- 4. Love coupons ---------- */
const Coupons: React.FC = () => {
    const [used, setUsed] = useState<number[]>([]);
    const toggle = (id: number) =>
        setUsed((u) => (u.includes(id) ? u.filter((x) => x !== id) : [...u, id]));

    return (
        <div className="grid gap-4">
            {loveCoupons.map((c, i) => {
                const done = used.includes(c.id);
                return (
                    <motion.button
                        key={c.id}
                        onClick={() => toggle(c.id)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, rotate: -0.6 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-4 text-left px-5 py-4 rounded-3xl border-2 border-dashed transition-colors ${
                            done
                                ? 'bg-sky-50 border-sky-200'
                                : 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-300'
                        }`}
                    >
                        <span className="text-3xl">{c.emoji}</span>
                        <span className={`flex-1 text-love-900 ${done ? 'line-through opacity-50' : ''}`}>
                            {c.text}
                        </span>
                        <span
                            className={`text-[11px] uppercase tracking-widest ${
                                done ? 'text-emerald-500' : 'text-rose-400'
                            }`}
                        >
                            {done ? 'Redeemed ✓' : 'Tap to redeem'}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
};

/* ---------- 5. Cute game: Catch the Hearts ---------- */
interface Falling {
    id: number;
    x: number;
    emoji: string;
    pts: number;
    dur: number;
}
const GAME_TIME = 20;

const CatchGame: React.FC = () => {
    const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME);
    const [items, setItems] = useState<Falling[]>([]);
    const [pops, setPops] = useState<{ id: number; x: number; text: string }[]>([]);
    const idRef = useRef(0);

    const spawn = useCallback(() => {
        const r = Math.random();
        const kind =
            r < 0.12
                ? { emoji: '🌟', pts: 3 }
                : r < 0.28
                ? { emoji: '💔', pts: -2 }
                : { emoji: ['💖', '💗', '💕', '💘'][Math.floor(Math.random() * 4)], pts: 1 };
        idRef.current += 1;
        setItems((it) => [
            ...it,
            { id: idRef.current, x: 4 + Math.random() * 82, dur: 2.8 + Math.random() * 1.6, ...kind },
        ]);
    }, []);

    useEffect(() => {
        if (phase !== 'playing') return;
        const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
        const sp = setInterval(spawn, 620);
        return () => {
            clearInterval(t);
            clearInterval(sp);
        };
    }, [phase, spawn]);

    useEffect(() => {
        if (phase === 'playing' && timeLeft <= 0) {
            setPhase('done');
            setItems([]);
            setBest((b) => Math.max(b, score));
        }
    }, [timeLeft, phase, score]);

    const start = () => {
        setScore(0);
        setTimeLeft(GAME_TIME);
        setItems([]);
        setPhase('playing');
    };

    const tap = (it: Falling) => {
        setItems((arr) => arr.filter((x) => x.id !== it.id));
        setScore((s) => Math.max(0, s + it.pts));
        const pid = ++idRef.current;
        setPops((p) => [...p, { id: pid, x: it.x, text: it.pts > 0 ? `+${it.pts}` : `${it.pts}` }]);
        setTimeout(() => setPops((p) => p.filter((x) => x.id !== pid)), 700);
    };

    const message =
        score >= 25
            ? 'You are a heart-catching legend! 👑'
            : score >= 15
            ? 'Wow, my heart is in safe hands 💕'
            : score >= 8
            ? 'Not bad, my love! Try again? 😘'
            : 'Aww, I will let you catch my heart anyway 🥰';

    return (
        <div className={`${glass} p-4 md:p-6`}>
            <div className="flex justify-between items-center mb-3 text-sky-700 text-sm">
                <span>
                    Score:{' '}
                    <motion.b key={score} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="text-rose-500 text-lg inline-block">
                        {score}
                    </motion.b>
                </span>
                <span>⏱ {phase === 'playing' ? timeLeft : GAME_TIME}s</span>
                <span>Best: {best}</span>
            </div>

            <div className="relative h-[380px] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-100 via-pink-50 to-rose-100 select-none touch-manipulation">
                {phase === 'playing' &&
                    items.map((it) => (
                        <motion.button
                            key={it.id}
                            style={{ left: `${it.x}%` }}
                            initial={{ top: '-14%' }}
                            animate={{ top: '104%', rotate: [0, 12, -12, 0] }}
                            transition={{ top: { duration: it.dur, ease: 'linear' }, rotate: { duration: 1.2, repeat: Infinity } }}
                            onAnimationComplete={() => setItems((a) => a.filter((x) => x.id !== it.id))}
                            onPointerDown={() => tap(it)}
                            whileTap={{ scale: 1.8, opacity: 0 }}
                            className="absolute text-4xl md:text-5xl drop-shadow-md"
                        >
                            {it.emoji}
                        </motion.button>
                    ))}

                <AnimatePresence>
                    {pops.map((p) => (
                        <motion.span
                            key={p.id}
                            initial={{ opacity: 1, y: 0 }}
                            animate={{ opacity: 0, y: -50 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            style={{ left: `${p.x}%` }}
                            className={`absolute bottom-6 font-bold text-xl pointer-events-none ${
                                p.text.startsWith('-') ? 'text-slate-500' : 'text-rose-500'
                            }`}
                        >
                            {p.text}
                        </motion.span>
                    ))}
                </AnimatePresence>

                {phase !== 'playing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm px-6"
                    >
                        {phase === 'idle' ? (
                            <>
                                <p className="text-love-900 font-display text-2xl mb-2">Catch the Hearts 💖</p>
                                <p className="text-sky-700 text-sm mb-5">
                                    Tap 💖 for +1, 🌟 for +3, but avoid 💔 (-2)! You have {GAME_TIME} seconds.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-4xl mb-1">🎉</p>
                                <p className="text-love-900 font-display text-2xl">You caught {score} points!</p>
                                <p className="text-sky-700 text-sm mt-1 mb-5">{message}</p>
                            </>
                        )}
                        <motion.button
                            onClick={start}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.94 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ scale: { duration: 1.6, repeat: Infinity } }}
                            className="px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 shadow-lg shadow-rose-300"
                        >
                            {phase === 'idle' ? 'Start Game' : 'Play Again'}
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

/* ---------- 6. Quiz ---------- */
const Quiz: React.FC = () => {
    const [i, setI] = useState(0);
    const [score, setScore] = useState(0);
    const [picked, setPicked] = useState<number | null>(null);
    const finished = i >= quizQuestions.length;

    const choose = (idx: number) => {
        if (picked !== null) return;
        setPicked(idx);
        if (idx === quizQuestions[i].answer) setScore((s) => s + 1);
        setTimeout(() => {
            setPicked(null);
            setI((n) => n + 1);
        }, 900);
    };
    const reset = () => {
        setI(0);
        setScore(0);
        setPicked(null);
    };
    const res =
        score === quizQuestions.length
            ? quizResults[2]
            : score >= Math.ceil(quizQuestions.length / 2)
            ? quizResults[1]
            : quizResults[0];

    return (
        <div className={`${glass} p-6 md:p-8`}>
            <AnimatePresence mode="wait">
                {finished ? (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-6xl mb-2"
                        >
                            {res.emoji}
                        </motion.div>
                        <p className="text-love-900 font-display text-2xl">
                            {score} / {quizQuestions.length}
                        </p>
                        <p className="text-sky-700 mt-2 mb-5">{res.text}</p>
                        <button
                            onClick={reset}
                            className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-rose-400 to-fuchsia-500 shadow-md"
                        >
                            Play again
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                    >
                        <p className="text-xs text-sky-400 mb-2">
                            Question {i + 1} of {quizQuestions.length}
                        </p>
                        <p className="text-love-900 text-lg mb-4">{quizQuestions[i].q}</p>
                        {quizQuestions[i].options.map((o, idx) => {
                            const correct = idx === quizQuestions[i].answer;
                            const state =
                                picked === null
                                    ? ''
                                    : correct
                                    ? 'bg-emerald-50 border-emerald-300'
                                    : picked === idx
                                    ? 'bg-rose-50 border-rose-300'
                                    : 'opacity-60';
                            return (
                                <motion.button
                                    key={o}
                                    onClick={() => choose(idx)}
                                    whileHover={{ x: 6 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`block w-full text-left px-4 py-3 mb-2 rounded-2xl border border-rose-100 bg-white text-sky-700 transition-colors ${state}`}
                                >
                                    {o}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ---------- PAGE ---------- */
const FinalBossPage: React.FC<FinalBossPageProps> = ({ onBack, onContinue }) => {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowIntro(false), 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-sky-50">
            {/* soft animated colour blobs */}
            <motion.div
                animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 14, repeat: Infinity }}
                className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -60, 0], y: [0, -50, 0], scale: [1, 1.25, 1] }}
                transition={{ duration: 16, repeat: Infinity }}
                className="absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl"
            />
            <FloatingHearts count={12} />

            <AnimatePresence mode="wait">
                {showIntro ? (
                    <motion.div
                        key="intro-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(20px)' }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="text-center p-8"
                        >
                            <h2 className="text-2xl md:text-3xl font-serif text-rose-400 mb-4 tracking-widest uppercase">
                                Chapter 3
                            </h2>
                            <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8" />
                            <h1 className={`text-5xl md:text-7xl font-display ${gradText}`}>The Final Boss</h1>
                            <p className="mt-6 text-lg text-slate-500 font-light italic">Level up, my love...</p>
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="relative z-10 px-4 py-8 md:py-16 max-w-3xl mx-auto">
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
                            className="text-center mb-14"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                className="text-5xl mb-4"
                            >
                                👑
                            </motion.div>
                            <h1 className={`text-4xl md:text-6xl font-display mb-3 ${gradText}`}>The Final Boss</h1>
                            <p className="font-handwriting text-xl md:text-2xl text-rose-400">
                                Everything I love about you 💕
                            </p>
                            <p className="text-sky-500/60 text-sm mt-2">(Tap everything. There are secrets inside.)</p>
                        </motion.div>

                        <Section emoji="🎮" title="Boss Profile" hint="Tap the badges to unlock them">
                            <BossCard />
                        </Section>

                        <Section emoji="🫙" title="Reasons I Love You" hint="Tap the jar">
                            <ReasonsJar />
                        </Section>

                        <Section emoji="💌" title="Open When..." hint="Tap a letter when you need it">
                            <OpenWhen />
                        </Section>

                        <Section emoji="🎟️" title="Love Coupons" hint="Valid forever. No expiry.">
                            <Coupons />
                        </Section>

                        <Section emoji="🕹️" title="Game Time" hint="Catch as many hearts as you can">
                            <CatchGame />
                        </Section>

                        <Section emoji="🧠" title="How Well Do You Know Us?" hint="Be honest 😏">
                            <Quiz />
                        </Section>

                        {/* Big emotional button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center"
                        >
                            <motion.button
                                onClick={onContinue}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group"
                            >
                                <div className="px-10 md:px-14 py-5 md:py-6 bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 text-white font-display text-xl md:text-2xl rounded-2xl shadow-2xl shadow-rose-300 transition-all duration-500">
                                    <motion.span
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="flex items-center gap-3"
                                    >
                                        <FaHeart className="text-white/90" />
                                        I Still Love You So Much
                                        <FaHeart className="text-white/90" />
                                    </motion.span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
                            </motion.button>
                        </motion.div>

                        <p className="text-center text-rose-400/70 mt-8 font-handwriting text-lg">
                            You are the most perfect person for me ❤️
                        </p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FinalBossPage;
