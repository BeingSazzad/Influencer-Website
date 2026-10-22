import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Red Hat Display"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        outfit: ['"Red Hat Display"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Red Hat Display"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        warm: {
          50: '#FCFCFB',
          100: '#FAFAF8',
          200: '#F4F4F0',
          300: '#E7E7E2',
          400: '#D2D2CA',
          500: '#9E9E94',
          600: '#66665E',
          700: '#52524B',
          800: '#33332D',
          900: '#0A0A0A',
          950: '#0A0A0A',
        },
        nearblack: '#0A0A0A',
        pastel: {
          lavender: '#F1EEF9',
          lavenderText: '#6444A6',
          mint: '#EEF7F2',
          mintText: '#23744D',
          butter: '#FAF6E8',
          butterText: '#8C6819',
          blush: '#FDF0ED',
          blushText: '#FF2D78',
          pink: '#FFF0F5',
          pinkText: '#FF2D78',
          rose: '#FFF0F5',
          roseText: '#FF2D78',
        },
      },
      maxWidth: {
        'content': '1280px',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '20px',
        '3xl': '28px',
        'container': '28px',
        'card': '20px',
        'input': '14px',
        'inner': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      height: {
        'btn-lg': '48px',
        'btn-md': '40px',
        'btn-sm': '32px',
      },
      fontSize: {
        /* Fluid scale: phone minimum, grows with the viewport, desktop size is the cap.
           text-sm and text-base stay fixed so body copy does not shrink. */
        lg: ['clamp(0.95rem, 0.9rem + 0.25vw, 1.125rem)', { lineHeight: '1.45' }],
        xl: ['clamp(1rem, 0.92rem + 0.45vw, 1.25rem)', { lineHeight: '1.35' }],
        '2xl': ['clamp(1.05rem, 0.9rem + 0.9vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        '3xl': ['clamp(1.15rem, 0.9rem + 1.5vw, 1.875rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '4xl': ['clamp(1.35rem, 0.95rem + 2vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        '5xl': ['clamp(1.5rem, 0.95rem + 2.6vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        '6xl': ['clamp(1.65rem, 1rem + 3.1vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '7xl': ['clamp(1.75rem, 1rem + 3.6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        display: ['clamp(1.65rem, 1rem + 2.8vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h1: ['clamp(1.45rem, 0.95rem + 2.2vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.25rem, 0.9rem + 1.6vw, 1.85rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.05rem, 0.95rem + 0.7vw, 1.25rem)', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        h4: ['clamp(0.95rem, 0.9rem + 0.3vw, 1rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
