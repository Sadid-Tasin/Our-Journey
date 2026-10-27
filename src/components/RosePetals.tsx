import React, { useMemo } from 'react';

// Rose petals falling animation for the final page
const RosePetals: React.FC<{ count?: number }> = ({ count = 20 }) => {
    const petals = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 15 + 8,
            duration: Math.random() * 8 + 10,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.4 + 0.2,
            rotation: Math.random() * 360,
        }));
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute"
                    style={{
                        left: `${petal.left}%`,
                        top: '-30px',
                        animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
                        opacity: petal.opacity,
                    }}
                >
                    <svg
                        width={petal.size}
                        height={petal.size * 1.3}
                        viewBox="0 0 20 26"
                        style={{
                            animation: `petalSpin ${petal.duration / 2}s ease-in-out infinite`,
                            transform: `rotate(${petal.rotation}deg)`,
                        }}
                    >
                        <ellipse cx="10" cy="13" rx="8" ry="12" fill="#FDA4AF" opacity="0.8" />
                        <ellipse cx="10" cy="13" rx="5" ry="8" fill="#FB7185" opacity="0.5" />
                    </svg>
                </div>
            ))}
            <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-30px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% {
            transform: translateY(110vh) translateX(80px) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes petalSpin {
          0%, 100% { transform: rotateY(0deg) rotateZ(0deg); }
          50% { transform: rotateY(180deg) rotateZ(45deg); }
        }
      `}</style>
        </div>
    );
};

export default RosePetals;
