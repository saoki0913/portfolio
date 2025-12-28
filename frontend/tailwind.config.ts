import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                md: '1.5rem',
                lg: '2rem',
                xl: '3rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        },
        extend: {
            colors: {
                // Dark Mode (Deep Focus) - 推奨
                background: 'oklch(18% 0.03 260)',
                card: 'oklch(24% 0.03 260)',
                foreground: 'oklch(95% 0.01 90)',
                subtle: 'oklch(70% 0.02 260)',
                muted: 'oklch(50% 0.02 260)',
                border: 'oklch(30% 0.02 260)',
                // Accent Colors - 強化
                primary: 'oklch(65% 0.20 250)', // Blue
                'primary-light': 'oklch(75% 0.18 250)',
                secondary: 'oklch(65% 0.20 300)', // Purple
                'secondary-light': 'oklch(75% 0.18 300)',
                accent: 'oklch(65% 0.13 140)',
                // Semantic Colors
                success: 'oklch(70% 0.18 150)',
                error: 'oklch(65% 0.25 25)',
                warning: 'oklch(75% 0.18 85)',
                info: 'oklch(70% 0.15 240)',
            },
            fontFamily: {
                sans: [
                    'Manrope',
                    'Zen Kaku Gothic New',
                    'Hiragino Kaku Gothic ProN',
                    'Meiryo',
                    'sans-serif',
                ],
                mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
            },
            fontSize: {
                'display': ['4.5rem', { lineHeight: '1.1' }],
                'hero': ['3.75rem', { lineHeight: '1.2' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, oklch(65% 0.20 250), oklch(65% 0.20 300))',
                'gradient-accent': 'linear-gradient(135deg, oklch(75% 0.18 250), oklch(75% 0.18 300))',
                'gradient-hero': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glow-primary': '0 0 40px 0 rgba(59, 130, 246, 0.3)',
                'glow-secondary': '0 0 40px 0 rgba(168, 85, 247, 0.3)',
            },
            backdropBlur: {
                'xs': '2px',
                'xl': '20px',
                '2xl': '40px',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'ripple': 'ripple 2.4s ease-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'fade-in-left': 'fadeInLeft 0.6s ease-out',
                'fade-in-right': 'fadeInRight 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
export default config 