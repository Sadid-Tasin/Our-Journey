import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import MessagesPage from './pages/MessagesPage';
import GalleryPage from './pages/GalleryPage';
import BlindBoxPage from './pages/BlindBoxPage';
import WishesPage from './pages/WishesPage';
import FinalBossPage from './pages/FinalBossPage';
import FinalPage from './pages/FinalPage';

type PageType =
    | 'login'
    | 'welcome'
    | 'main'
    | 'messages'
    | 'gallery'
    | 'blindbox'
    | 'wishes'
    | 'finalboss'
    | 'final';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<PageType>('login');

    const navigateTo = (page: PageType) => {
        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <LoginPage onSuccess={() => navigateTo('welcome')} />;
            case 'welcome':
                return <WelcomePage onContinue={() => navigateTo('main')} />;
            case 'main':
                return <MainPage onNavigate={(page) => navigateTo(page as PageType)} />;
            case 'messages':
                return <MessagesPage onBack={() => navigateTo('main')} />;
            case 'gallery':
                return <GalleryPage onBack={() => navigateTo('main')} />;
            case 'blindbox':
                return <BlindBoxPage onBack={() => navigateTo('main')} />;
            case 'wishes':
                return <WishesPage onBack={() => navigateTo('main')} />;
            case 'finalboss':
                return (
                    <FinalBossPage
                        onBack={() => navigateTo('main')}
                        onContinue={() => navigateTo('final')}
                    />
                );
            case 'final':
                return <FinalPage />;
            default:
                return <LoginPage onSuccess={() => navigateTo('welcome')} />;
        }
    };

    return (
        <div className="min-h-screen">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {renderPage()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default App;
