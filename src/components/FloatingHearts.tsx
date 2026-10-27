import React, { useMemo } from 'react';

// Floating hearts background component
const FloatingHearts: React.FC<{ count?: number }> = ({ count = 15 }) => {
    const hearts = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 15,
            opacity: Math.random() * 0.3 + 0.1,
            swayAmount: Math.random() * 40 + 10,
            color: ['#FDA4AF', '#FB7185', '#F43F5E', '#FF6B9D', '#FF85A2', '#E11D48'][Math.floor(Math.random() * 6)],
        }));
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="absolute"
                    style={{
                        left: `${heart.left}%`,
                        bottom: '-60px',
                        animation: `heartFloat ${heart.duration}s linear ${heart.delay}s infinite`,
                        opacity: heart.opacity,
                    }}
                >
                    <svg
                        width={heart.size}
                        height={heart.size}
                        viewBox="0 0 24 24"
                        fill={heart.color}
                        style={{
                            animation: `heartSway ${heart.duration / 3}s ease-in-out infinite`,
                            filter: `blur(${heart.size > 20 ? 1 : 0}px)`,
                        }}
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            ))}
            <style>{`
        @keyframes heartFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: var(--heart-opacity, 0.3);
          }
          90% {
            opacity: var(--heart-opacity, 0.3);
          }
          100% {
            transform: translateY(-110vh) translateX(${Math.random() > 0.5 ? '' : '-'}30px);
            opacity: 0;
          }
        }
        @keyframes heartSway {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(15px) rotate(10deg);
          }
          75% {
            transform: translateX(-15px) rotate(-10deg);
          }
        }
      `}</style>
        </div>
    );
};

export default FloatingHearts;
