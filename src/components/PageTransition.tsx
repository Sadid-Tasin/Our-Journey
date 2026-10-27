import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
    pageKey: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pageKey}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full min-h-screen"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
