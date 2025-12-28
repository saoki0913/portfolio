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
                // Apple HIG Brand Colors (Blue) - Primary
                brand: {
                    50: 'oklch(97% 0.05 250)',
                    100: 'oklch(93% 0.08 250)',
                    200: 'oklch(85% 0.12 250)',
                    300: 'oklch(75% 0.16 250)',
                    400: 'oklch(70% 0.18 250)',
                    500: 'oklch(65% 0.20 250)', // Main brand color
                    600: 'oklch(55% 0.20 250)',
                    700: 'oklch(45% 0.18 250)',
                    800: 'oklch(35% 0.15 250)',
                    900: 'oklch(25% 0.12 250)',
                },
                // Apple HIG Accent Colors (Purple) - Secondary
                accent: {
                    50: 'oklch(97% 0.05 300)',
                    100: 'oklch(93% 0.08 300)',
                    200: 'oklch(85% 0.12 300)',
                    300: 'oklch(75% 0.16 300)',
                    400: 'oklch(70% 0.18 300)',
                    500: 'oklch(65% 0.20 300)', // Main accent color
                    600: 'oklch(55% 0.20 300)',
                    700: 'oklch(45% 0.18 300)',
                    800: 'oklch(35% 0.15 300)',
                    900: 'oklch(25% 0.12 300)',
                },
                // Neutral Colors (Grayscale)
                neutral: {
                    50: 'oklch(98% 0.005 280)',
                    100: 'oklch(96% 0.005 280)',
                    200: 'oklch(92% 0.008 280)',
                    300: 'oklch(85% 0.01 280)',
                    400: 'oklch(70% 0.015 280)',
                    500: 'oklch(55% 0.02 280)',
                    600: 'oklch(45% 0.02 280)',
                    700: 'oklch(35% 0.025 280)',
                    800: 'oklch(25% 0.03 280)',
                    900: 'oklch(18% 0.03 280)',
                },
                // Semantic Colors with variants
                success: {
                    light: 'oklch(85% 0.15 150)',
                    DEFAULT: 'oklch(70% 0.18 150)',
                    dark: 'oklch(55% 0.18 150)',
                },
                error: {
                    light: 'oklch(85% 0.20 25)',
                    DEFAULT: 'oklch(65% 0.25 25)',
                    dark: 'oklch(50% 0.25 25)',
                },
                warning: {
                    light: 'oklch(90% 0.15 85)',
                    DEFAULT: 'oklch(75% 0.18 85)',
                    dark: 'oklch(60% 0.18 85)',
                },
                info: {
                    light: 'oklch(85% 0.12 240)',
                    DEFAULT: 'oklch(70% 0.15 240)',
                    dark: 'oklch(55% 0.15 240)',
                },
                // Aliases for compatibility
                primary: 'oklch(65% 0.20 250)',
                'primary-light': 'oklch(75% 0.18 250)',
                secondary: 'oklch(65% 0.20 300)',
                'secondary-light': 'oklch(75% 0.18 300)',
                background: 'oklch(18% 0.03 260)',
                foreground: 'oklch(95% 0.01 90)',
                card: 'oklch(24% 0.03 260)',
                subtle: 'oklch(70% 0.02 260)',
                muted: 'oklch(50% 0.02 260)',
                border: 'oklch(30% 0.02 260)',
            },
            fontFamily: {
                sans: [
                    'SF Pro Display',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                mono: [
                    'SF Mono',
                    'Monaco',
                    'Cascadia Code',
                    'Consolas',
                    'monospace',
                ],
            },
            fontSize: {
                // Display (Hero headings)
                'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
                // Heading (Section headings)
                'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
                'h2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
                'h3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
                'h4': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],
                // Body (Main text)
                'body-xl': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }],
                'body-lg': ['1rem', { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }],
                'body-md': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
                'body-sm': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],
                // Label (Captions, labels)
                'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
                'label-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
                'label-sm': ['0.625rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '600' }],
                // Legacy aliases
                'display': ['4.5rem', { lineHeight: '1.1' }],
                'hero': ['3.75rem', { lineHeight: '1.2' }],
            },
            spacing: {
                '0': '0',
                '0.5': '0.125rem',
                '1': '0.25rem',
                '2': '0.5rem',
                '3': '0.75rem',
                '4': '1rem',
                '6': '1.5rem',
                '8': '2rem',
                '12': '3rem',
                '16': '4rem',
                '18': '4.5rem',
                '22': '5.5rem',
                '24': '6rem',
            },
            borderRadius: {
                'none': '0',
                'sm': '0.25rem',
                'DEFAULT': '0.5rem',
                'md': '0.75rem',
                'lg': '1rem',
                'xl': '1.5rem',
                '2xl': '2rem',
                '3xl': '3rem',
                'full': '9999px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, oklch(65% 0.20 250), oklch(65% 0.20 300))',
                'gradient-accent': 'linear-gradient(135deg, oklch(75% 0.18 250), oklch(75% 0.18 300))',
                'gradient-hero': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
            },
            boxShadow: {
                // Apple HIG Shadow System
                'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'sm': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
                'md': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
                'lg': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
                'xl': '0 16px 48px 0 rgba(0, 0, 0, 0.15)',
                '2xl': '0 24px 64px 0 rgba(0, 0, 0, 0.18)',
                // Brand-specific shadows
                'brand': '0 8px 32px 0 rgba(59, 130, 246, 0.2)',
                'brand-lg': '0 16px 48px 0 rgba(59, 130, 246, 0.25)',
                // Legacy aliases
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