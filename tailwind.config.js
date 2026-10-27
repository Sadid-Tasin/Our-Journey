/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                love: {
                    50: '#F0FCFF',
                    100: '#E6FAFE',
                    200: '#D7F8FE',
                    300: '#C3F4FD',
                    400: '#A5EEFD',
                    500: '#7EE7FC',
                    600: '#06B7DB',
                    700: '#09AACD',
                    800: '#0E8AAA',
                    900: '#053B48',
                },
                rose: {
                    50: '#FFF1F2',
                    100: '#FFE4E6',
                    200: '#FECDD3',
                    300: '#FDA4AF',
                    400: '#FB7185',
                    500: '#F43F5E',
                    600: '#E11D48',
                    700: '#BE123C',
                    800: '#9F1239',
                    900: '#881337',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Playfair Display', 'Georgia', 'serif'],
                handwriting: ['Dancing Script', 'cursive'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-slower': 'float 12s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
                'drift-up': 'driftUp 20s linear infinite',
                'sway': 'sway 4s ease-in-out infinite',
                'sparkle': 'sparkle 2s ease-in-out infinite',
                'envelope-open': 'envelopeOpen 1.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'glow': 'glow 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseSoft: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.05)', opacity: '0.9' },
                },
                driftUp: {
                    '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '0.6' },
                    '90%': { opacity: '0.6' },
                    '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
                },
                sway: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(15px)' },
                },
                sparkle: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                },
                envelopeOpen: {
                    '0%': { transform: 'rotateX(0deg)' },
                    '100%': { transform: 'rotateX(180deg)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(6, 183, 219, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(6, 183, 219, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
